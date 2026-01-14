# GitHub Actions Setup Guide

## Blog Post Reminder Workflow

This repository includes a GitHub Actions workflow that automatically sends you an email reminder to write a blog post whenever a pull request is merged to the `main` branch.

---

## Workflow File

**Location**: `.github/workflows/blog-reminder.yml`

**Trigger**: Runs automatically when a PR is merged (not just closed) to the `main` branch.

**What it does**: Sends an email with PR details and a reminder to consider writing a blog post about the update.

---

## Setup Instructions

### Step 1: Configure Repository Secrets

You need to add three secrets to your GitHub repository:

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add the following:

#### Required Secrets:

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `SMTP_USERNAME` | Your email address (Gmail recommended) | `curtis@example.com` |
| `SMTP_PASSWORD` | App-specific password (see below) | `abcd efgh ijkl mnop` |
| `REMINDER_EMAIL` | Email where you want to receive reminders | `curtis@example.com` |

---

### Step 2: Generate an App-Specific Password

**If using Gmail (recommended)**:

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Scroll down to **App passwords**
4. Click **Generate** and select:
   - **App**: Mail
   - **Device**: Other (custom name) → "GitHub Actions"
5. Copy the 16-character password (format: `xxxx xxxx xxxx xxxx`)
6. Use this as your `SMTP_PASSWORD` secret

**If using another email provider**:

You'll need to find your provider's SMTP settings:
- **Outlook/Hotmail**: `smtp.office365.com`, port `587`
- **Yahoo**: `smtp.mail.yahoo.com`, port `587`
- **Custom domain**: Check with your email provider

Update the `server_address` and `server_port` in `.github/workflows/blog-reminder.yml` accordingly.

---

### Step 3: Test the Workflow

1. Create a test branch:
   ```bash
   git checkout -b test-blog-reminder
   ```

2. Make a small change (e.g., update README.md)

3. Commit and push:
   ```bash
   git add .
   git commit -m "Test blog reminder workflow"
   git push origin test-blog-reminder
   ```

4. Go to GitHub and create a pull request from `test-blog-reminder` to `main`

5. Merge the pull request

6. Check the **Actions** tab to see the workflow run

7. Check your email for the reminder

---

## Email Template

When a PR is merged, you'll receive an email like this:

```
Subject: 📝 Blog Post Reminder: PR #123 merged

Hi Curtis,

A pull request has been merged to the GF PriceChecker website!

PR Details:
- Title: Add new feature documentation
- Number: #123
- Merged by: CuWilliams
- Merged at: 2026-01-13T10:30:00Z
- URL: https://github.com/CuWilliams/gfpricechecker.github.io/pull/123

Consider writing a blog post about this update!

To add a new blog post:
1. Edit data/blog.json
2. Add your post with title, date, and content
3. Commit and push to update the website

---
This is an automated reminder from GitHub Actions.
```

---

## Customization Options

### Change Email Provider

Edit `.github/workflows/blog-reminder.yml` lines 17-19:

```yaml
server_address: smtp.gmail.com  # Change to your SMTP server
server_port: 587                # Change if needed
secure: true                    # Use TLS/SSL
```

### Change Email Subject

Edit line 27:

```yaml
subject: "Your custom subject here"
```

### Change Email Body

Edit lines 32-52 to customize the reminder message.

### Filter Specific Branches

Currently triggers only on `main` branch. To add more branches, edit lines 5-6:

```yaml
branches:
  - main
  - production  # Add more branches
```

### Filter by PR Labels

To only send reminders for PRs with specific labels (e.g., "feature"):

```yaml
on:
  pull_request:
    types: [closed]
    branches:
      - main

jobs:
  send-reminder:
    if: |
      github.event.pull_request.merged == true &&
      contains(github.event.pull_request.labels.*.name, 'feature')
```

---

## Troubleshooting

### Workflow doesn't run

- **Check**: Did you merge the PR? (Closing without merging won't trigger it)
- **Check**: Was it merged to the `main` branch?
- **Check**: Go to **Actions** tab and look for error messages

### Email not received

- **Check**: Verify secrets are set correctly in repository settings
- **Check**: Look for errors in the Actions log
- **Check**: Check spam/junk folder
- **Check**: Verify Gmail App Password is correct (16 characters, no spaces)
- **Check**: Ensure 2-Step Verification is enabled on Gmail

### "Authentication failed" error

- **Fix**: Regenerate your App Password in Gmail
- **Fix**: Make sure you're using an App Password, not your regular Gmail password
- **Fix**: Double-check the `SMTP_USERNAME` matches your email exactly

### "Connection timeout" error

- **Fix**: Check if your SMTP server and port are correct
- **Fix**: Try using port `465` with `secure: true` instead of `587`

---

## Security Best Practices

✅ **DO**:
- Use App-Specific Passwords (not your main email password)
- Store credentials as GitHub Secrets (never commit them)
- Use Gmail or another trusted SMTP provider
- Review the Actions log to ensure no sensitive data is exposed

❌ **DON'T**:
- Commit passwords or email addresses to the repository
- Share your App Password with anyone
- Use your main email password

---

## Workflow Costs

**GitHub Actions free tier**:
- Public repositories: Unlimited minutes
- Private repositories: 2,000 minutes/month

**This workflow usage**:
- Approximately 30 seconds per run
- If you merge 100 PRs per month: ~50 minutes used
- Well within free tier limits

---

## Disabling the Workflow

If you want to temporarily disable the reminder:

**Option 1: Disable in GitHub UI**
1. Go to **Actions** tab
2. Click **Blog Post Reminder** in the left sidebar
3. Click the **⋯** menu → **Disable workflow**

**Option 2: Delete the file**
```bash
rm .github/workflows/blog-reminder.yml
git add .
git commit -m "Disable blog reminder workflow"
git push
```

---

## Alternative: Slack/Discord Notifications

If you'd prefer Slack or Discord notifications instead of email, let me know and I can create those workflows instead!

---

*Last Updated: January 13, 2026*
