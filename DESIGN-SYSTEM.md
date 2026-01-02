# Authentic Design System

> **Purpose**: Guide for creating clean, minimal designs that avoid generic AI-generated aesthetics.  
> **For**: Web (HTML/CSS) and iOS (SwiftUI) development  
> **Brand**: Bold blue (#0000FF) with clean, minimal aesthetic

---

## Quick Reference

### Brand Colors
```css
--primary-blue: #0000FF;
--black: #000000;
--white: #FFFFFF;
--light-gray: #F5F5F5;
--medium-gray: #808080;
--dark-gray: #333333;
```

### Spacing System (8px base)
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
```

### Typography Scale
```css
--text-xs: 0.75rem;   /* 12px */
--text-sm: 0.875rem;  /* 14px */
--text-md: 1rem;      /* 16px - body */
--text-lg: 1.25rem;   /* 20px */
--text-xl: 1.5rem;    /* 24px */
--text-2xl: 2rem;     /* 32px */
--text-3xl: 2.5rem;   /* 40px - main heading */
```

---

## Core Principles

### ✅ DO:
- Use **solid colors only** (no gradients)
- Limit to **2-3 colors per screen**
- Use **generous whitespace**
- Create hierarchy with **size and weight**, not color
- Keep body text **16-18px** (web) or `.body` (iOS)
- Use **8px spacing increments**
- Make designs work in **black and white**

### 🚫 DON'T:
- Use gradients (major AI design tell)
- Add floating decorative shapes
- Use neon/oversaturated colors
- Add heavy shadows or glows
- Over-animate elements
- Fill every pixel with content
- Use more than 3 font weights

---

## Anti-AI Design Checklist

Before finalizing any design, verify:

- [ ] **NO gradients anywhere** (even subtle ones)
- [ ] **NO floating geometric decorations**
- [ ] **NO neon colors** beyond brand blue
- [ ] **NO heavy drop shadows** (subtle only: `0 2px 4px rgba(0,0,0,0.05)`)
- [ ] **NO unnecessary animations**
- [ ] Uses **2-3 colors maximum** per screen
- [ ] Has **generous whitespace**
- [ ] Works in **black and white**
- [ ] Feels **intentional**, not template-based

---

## Web (HTML/CSS) Templates

### CSS Design Tokens
```css
:root {
  /* Colors */
  --primary-blue: #0000FF;
  --black: #000000;
  --white: #FFFFFF;
  --light-gray: #F5F5F5;
  --medium-gray: #808080;
  --dark-gray: #333333;
  
  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --text-md: 1rem;
  --text-lg: 1.25rem;
  --text-2xl: 2rem;
  
  /* Spacing */
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  
  /* Layout */
  --max-width: 1200px;
  --border-radius: 8px;
}

body {
  font-family: var(--font-family);
  font-size: var(--text-md);
  line-height: 1.6;
  color: var(--black);
  background-color: var(--white);
}
```

### Button Components
```css
.button {
  padding: var(--space-md) var(--space-xl);
  font-weight: 600;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
}

.button-primary {
  background-color: var(--primary-blue);
  color: var(--white);
}

.button-primary:hover {
  background-color: rgba(0, 0, 255, 0.85); /* Opacity change, NOT gradient */
}

.button-secondary {
  background-color: var(--white);
  color: var(--primary-blue);
  border: 2px solid var(--primary-blue);
}

.button-secondary:hover {
  background-color: var(--light-gray);
}
```

### Card Component
```css
.card {
  background-color: var(--white);
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  padding: var(--space-xl);
  /* Subtle shadow only */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease;
}
```

### Layout Patterns
```css
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

.section {
  padding: var(--space-3xl) 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-xl);
}

/* Responsive */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

---

## iOS (SwiftUI) Templates

### Design System Extensions
```swift
// MARK: - Colors
extension Color {
    static let primaryBlue = Color(red: 0/255, green: 0/255, blue: 255/255)
    static let lightGray = Color(red: 245/255, green: 245/255, blue: 245/255)
    static let mediumGray = Color(red: 128/255, green: 128/255, blue: 128/255)
    static let darkGray = Color(red: 51/255, green: 51/255, blue: 51/255)
}

// MARK: - Spacing
struct Spacing {
    static let xs: CGFloat = 4
    static let sm: CGFloat = 8
    static let md: CGFloat = 16
    static let lg: CGFloat = 24
    static let xl: CGFloat = 32
    static let xxl: CGFloat = 48
}
```

### Button Components
```swift
// Primary Button - Solid blue, no gradient
struct PrimaryButton: View {
    let title: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 17, weight: .semibold))
                .foregroundColor(.white)
                .frame(maxWidth: .infinity)
                .padding(.vertical, Spacing.md)
                .background(Color.primaryBlue)
                .cornerRadius(8)
        }
    }
}

// Secondary Button - Outlined style
struct SecondaryButton: View {
    let title: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            Text(title)
                .font(.system(size: 17, weight: .semibold))
                .foregroundColor(.primaryBlue)
                .frame(maxWidth: .infinity)
                .padding(.vertical, Spacing.md)
                .background(Color.white)
                .overlay(
                    RoundedRectangle(cornerRadius: 8)
                        .stroke(Color.primaryBlue, lineWidth: 2)
                )
        }
    }
}
```

### Card Component
```swift
struct Card<Content: View>: View {
    let content: Content
    
    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }
    
    var body: some View {
        VStack(alignment: .leading, spacing: Spacing.md) {
            content
        }
        .padding(Spacing.lg)
        .background(Color.white)
        .cornerRadius(8)
        .shadow(color: Color.black.opacity(0.05), radius: 4, x: 0, y: 2)
    }
}
```

### Layout Patterns
```swift
// Clean vertical layout with consistent spacing
VStack(alignment: .leading, spacing: Spacing.xl) {
    Text("Heading")
        .font(.largeTitle)
        .fontWeight(.bold)
    
    Text("Body text with good line spacing")
        .font(.body)
        .foregroundColor(.darkGray)
        .lineSpacing(4)
    
    PrimaryButton(title: "Action") { }
}
.padding(Spacing.lg)

// Grid layout for cards
LazyVGrid(columns: [
    GridItem(.flexible()),
    GridItem(.flexible())
], spacing: Spacing.md) {
    ForEach(items) { item in
        Card {
            // Card content
        }
    }
}
```

---

## Typography Guidelines

### Hierarchy (3-4 levels maximum)
```css
/* Web */
h1 { font-size: var(--text-3xl); font-weight: 700; line-height: 1.2; }
h2 { font-size: var(--text-2xl); font-weight: 600; line-height: 1.3; }
h3 { font-size: var(--text-xl); font-weight: 600; line-height: 1.4; }
p  { font-size: var(--text-md); line-height: 1.6; max-width: 65ch; }
```

```swift
// iOS
Text("Main Heading").font(.largeTitle).fontWeight(.bold)
Text("Section").font(.title2).fontWeight(.semibold)
Text("Body").font(.body)
Text("Caption").font(.caption).foregroundColor(.mediumGray)
```

### Rules
- Body text: **16-18px** (web) or `.body` (iOS)
- Line height: **1.5-1.8** for readability
- Max line length: **60-75 characters**
- Use size/weight for hierarchy, not color
- Limit to **3 font weights**: regular, semibold, bold

---

## Common Patterns

### Hero Section (No Gradients)
```css
.hero {
  background-color: var(--light-gray); /* Solid color, NOT gradient */
  padding: var(--space-3xl) 0;
  text-align: center;
}
```

```swift
VStack(spacing: Spacing.xl) {
    Text("Welcome")
        .font(.largeTitle)
        .fontWeight(.bold)
    
    Text("Description text")
        .font(.body)
        .foregroundColor(.darkGray)
}
.padding(Spacing.xxl)
.frame(maxWidth: .infinity)
.background(Color.lightGray)
```

### Form Input
```css
input {
  padding: var(--space-md);
  border: 1px solid var(--light-gray);
  border-radius: var(--border-radius);
  font-size: var(--text-md);
  transition: border-color 0.2s ease;
}

input:focus {
  outline: none;
  border-color: var(--primary-blue);
}
```

```swift
TextField("Placeholder", text: $text)
    .padding(Spacing.md)
    .background(Color.white)
    .overlay(
        RoundedRectangle(cornerRadius: 8)
            .stroke(Color.lightGray, lineWidth: 1)
    )
```

---

## Color Usage Rules

### Primary Blue (#0000FF)
- **Use for**: Primary CTAs, key actions, links, brand moments
- **Don't use for**: Backgrounds, large areas, body text

### Black (#000000) / Dark Gray (#333333)
- **Use for**: Body text, headings, icons
- **Tip**: Use dark gray for softer appearance

### Light Gray (#F5F5F5)
- **Use for**: Subtle backgrounds, card surfaces, section dividers
- **Creates**: Visual separation without harsh contrast

### White (#FFFFFF)
- **Use for**: Main backgrounds, button text on blue
- **Essential**: For generous whitespace

### Accent Colors (Use Sparingly)
- **Success**: `#00C853` (green) - only for success states
- **Warning**: `#FF6D00` (orange) - only for warnings  
- **Error**: `#D50000` (red) - only for errors

---

## Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Approach
- **Mobile-first**: Design for mobile, enhance for larger screens
- **Stack vertically**: On mobile, use single columns
- **Increase spacing**: More whitespace on larger screens
- **Maintain consistency**: Same spacing system at all sizes

---

## Testing Your Design

### The "AI Check"
Ask yourself:
1. Could this appear in a template marketplace? (If yes → too generic)
2. Does it use more than 3 colors? (If yes → simplify)
3. Are there gradients or glows? (If yes → remove them)
4. Would this work in black and white? (If no → too reliant on effects)

### The Authenticity Test
Show to someone and ask: "What company does this remind you of?"
- If "a tech startup" or "an app" → too generic
- If they describe YOUR brand/product → authentic ✓

---

## Quick Prompts for Claude Code

When starting a new design task, paste this:

```
Follow the DESIGN-SYSTEM.md guidelines:
- Use solid colors only (NO gradients)
- Primary blue #0000FF for key actions
- 8px spacing increments
- 2-3 colors max per screen
- Generous whitespace
- Clean typography hierarchy
```

For reviews:
```
Review this design against DESIGN-SYSTEM.md and check:
- Any gradients? (remove)
- More than 3 colors? (simplify)
- Consistent spacing? (use 8px increments)
- Works in black/white? (test)
```

---

## Examples of What to Avoid

### ❌ AI-Generated Aesthetics
- Purple-to-blue gradients
- Neon color combinations
- Floating blob backgrounds
- Heavy drop shadows everywhere
- Glassmorphism effects
- Cursor-following animations
- Random geometric shapes

### ✅ Authentic Alternatives
- Solid blue backgrounds
- Black/white/gray combinations
- Clean, flat surfaces
- Subtle shadows on cards only
- Simple hover transitions
- Static, intentional layouts
- Purposeful rectangles/squares

---

## Reference Companies

Examples of authentic (non-AI) design:
- **Stripe**: Clean, functional, minimal
- **Linear**: Fast, simple, purposeful
- **Basecamp**: Content-first, unpretentious
- **Apple**: System-aligned, consistent

**Common traits**:
- Limited color palettes (2-3 colors)
- Generous whitespace
- Clear hierarchy
- No unnecessary effects
- Functional over decorative

---

## Version & Updates

**Version**: 1.0  
**Last Updated**: 2026-01-02  
**Brand Colors**: Blue (#0000FF), Black, White, Grays  
**Design Philosophy**: Clean, minimal, authentic, anti-AI aesthetics

---

*Remember: Authentic design comes from intentional decisions, not from applying effects. Focus on content, use solid colors, embrace whitespace, and your designs will feel genuinely crafted rather than AI-generated.*
