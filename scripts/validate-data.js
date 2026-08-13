#!/usr/bin/env node
/**
 * GF PriceChecker - Data file validator
 *
 * The files under data/ are hand-edited JSON with an implicit contract: the
 * loaders interpolate fields like `id` straight into markup, so a missing key
 * produces `post-undefined` rather than an error. The page still renders and
 * the only symptom is a link that goes nowhere.
 *
 * This script makes that contract explicit and checkable. It has no
 * dependencies — run it with `node scripts/validate-data.js`, or let the
 * validate-data workflow run it on every push and pull request.
 *
 * Exits 0 when every file is valid, 1 otherwise, printing one line per problem.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'data');

// Anchors are built as `#post-<id>`, so ids have to survive a URL fragment.
const ID_PATTERN = /^[A-Za-z0-9._-]+$/;
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const STATUS_STATES = ['coming-soon', 'testflight', 'available', 'maintenance'];

/**
 * Schemas for the array-shaped data files.
 *
 * required   - fields that must be present, a string, and not blank
 * unique     - field whose values must not repeat within the file
 * ids        - fields checked against ID_PATTERN
 * dates      - fields checked as real YYYY-MM-DD calendar dates
 */
const LIST_SCHEMAS = {
  'blog.json': {
    required: ['id', 'date', 'title', 'content'],
    unique: 'id',
    ids: ['id'],
    dates: ['date']
  },
  'announcements.json': {
    required: ['id', 'date', 'title', 'content'],
    unique: 'id',
    ids: ['id'],
    dates: ['date']
  },
  'faq.json': {
    required: ['id', 'question', 'answer'],
    unique: 'id',
    ids: ['id'],
    dates: []
  }
};

/**
 * Read and parse a JSON file.
 * @returns {{data: *}|{error: string}}
 */
function readJSON(filePath) {
  let raw;
  try {
    raw = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    return { error: `could not be read (${error.code || error.message})` };
  }

  try {
    return { data: JSON.parse(raw) };
  } catch (error) {
    return { error: `is not valid JSON — ${error.message}` };
  }
}

/**
 * True when a value is a non-blank string.
 */
function isFilledString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/**
 * True when a string is a real calendar date in YYYY-MM-DD form.
 * Rejects both unparseable text and impossible dates like 2026-02-30.
 */
function isCalendarDate(value) {
  const parts = DATE_PATTERN.exec(value);
  if (!parts) return false;

  const [, year, month, day] = parts.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year &&
         date.getUTCMonth() === month - 1 &&
         date.getUTCDate() === day;
}

/**
 * Validate one array-of-records data file.
 * @param {string} fileName - e.g. "blog.json"
 * @param {*} data - parsed file contents
 * @param {Object} schema - entry from LIST_SCHEMAS
 * @returns {string[]} problems found, empty when valid
 */
function validateList(fileName, data, schema) {
  const problems = [];

  if (!Array.isArray(data)) {
    return [`${fileName}: top level must be an array, found ${typeof data}`];
  }

  if (data.length === 0) {
    problems.push(`${fileName}: contains no entries`);
  }

  const seen = new Map();

  data.forEach((entry, index) => {
    // Entries are located by index and, once we know it, by id — the index
    // alone is hard to find in a file sorted by neither.
    const label = isFilledString(entry && entry.id)
      ? `${fileName}[${index}] (id "${entry.id}")`
      : `${fileName}[${index}]`;

    if (entry === null || typeof entry !== 'object' || Array.isArray(entry)) {
      problems.push(`${label}: must be an object`);
      return;
    }

    schema.required.forEach(field => {
      if (!(field in entry)) {
        problems.push(`${label}: missing required field "${field}"`);
      } else if (!isFilledString(entry[field])) {
        problems.push(`${label}: "${field}" must be a non-empty string`);
      }
    });

    schema.ids.forEach(field => {
      if (isFilledString(entry[field]) && !ID_PATTERN.test(entry[field])) {
        problems.push(
          `${label}: "${field}" must contain only letters, numbers, dot, dash or underscore ` +
          `(it becomes a URL anchor), found "${entry[field]}"`
        );
      }
    });

    schema.dates.forEach(field => {
      if (isFilledString(entry[field]) && !isCalendarDate(entry[field])) {
        problems.push(`${label}: "${field}" must be a real date in YYYY-MM-DD form, found "${entry[field]}"`);
      }
    });

    if (schema.unique && isFilledString(entry[schema.unique])) {
      const value = entry[schema.unique];
      if (seen.has(value)) {
        problems.push(
          `${label}: duplicate "${schema.unique}" — also used by ${fileName}[${seen.get(value)}]`
        );
      } else {
        seen.set(value, index);
      }
    }
  });

  return problems;
}

/**
 * Validate status.json, which is a single object rather than a list.
 * @returns {string[]} problems found, empty when valid
 */
function validateStatus(fileName, data) {
  const problems = [];

  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    return [`${fileName}: top level must be an object`];
  }

  ['state', 'message'].forEach(field => {
    if (!isFilledString(data[field])) {
      problems.push(`${fileName}: "${field}" is required and must be a non-empty string`);
    }
  });

  if (isFilledString(data.state) && !STATUS_STATES.includes(data.state)) {
    problems.push(
      `${fileName}: "state" must be one of ${STATUS_STATES.join(', ')}, found "${data.state}"`
    );
  }

  // linkText is only rendered alongside a link, so one without the other is a
  // sign the banner was half-edited.
  if (isFilledString(data.linkText) && !isFilledString(data.link)) {
    problems.push(`${fileName}: "linkText" is set but "link" is missing`);
  }

  if (data.contacts !== undefined) {
    if (!Array.isArray(data.contacts)) {
      problems.push(`${fileName}: "contacts" must be an array`);
    } else {
      data.contacts.forEach((contact, index) => {
        ['label', 'url'].forEach(field => {
          if (!contact || !isFilledString(contact[field])) {
            problems.push(`${fileName}: contacts[${index}] is missing "${field}"`);
          }
        });
      });
    }
  }

  return problems;
}

function main() {
  const problems = [];

  Object.keys(LIST_SCHEMAS).forEach(fileName => {
    const result = readJSON(path.join(DATA_DIR, fileName));
    if (result.error) {
      problems.push(`${fileName}: ${result.error}`);
      return;
    }
    problems.push(...validateList(fileName, result.data, LIST_SCHEMAS[fileName]));
  });

  const statusResult = readJSON(path.join(DATA_DIR, 'status.json'));
  if (statusResult.error) {
    problems.push(`status.json: ${statusResult.error}`);
  } else {
    problems.push(...validateStatus('status.json', statusResult.data));
  }

  if (problems.length > 0) {
    console.error(`Data validation failed — ${problems.length} problem(s):\n`);
    problems.forEach(problem => console.error(`  ✗ ${problem}`));
    console.error('\nSee "Adding content" in README.md for the expected shape of each file.');
    process.exit(1);
  }

  console.log('Data validation passed — blog.json, announcements.json, faq.json, status.json all valid.');
}

main();
