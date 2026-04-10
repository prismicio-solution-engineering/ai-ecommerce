---
description: How to use the global styling system in this project. Follow these guidelines when creating or updating components.
globs: ["**/*.tsx", "**/*.css"]
alwaysApply: false
---

# Styling System

This project uses CSS custom properties (variables) defined in `app/globals.css` for all colors and fonts. This allows the entire site's theme to be controlled from a single file.

## Available CSS Variables

All variables are defined in `app/globals.css`:

### Brand Colors

| Variable            | Purpose                                    |
| ------------------- | ------------------------------------------ |
| `--brand-primary`   | Main brand color (buttons, links, accents) |
| `--brand-secondary` | Supporting brand color                     |
| `--brand-accent`    | Tertiary accent color                      |

### Typography

| Variable         | Purpose        |
| ---------------- | -------------- |
| `--font-heading` | Heading font   |
| `--font-body`    | Body text font |

### Semantic Colors

| Variable                 | Purpose                    |
| ------------------------ | -------------------------- |
| `--color-background`     | Page background            |
| `--color-surface`        | Card/section backgrounds   |
| `--color-text-primary`   | Headings and primary text  |
| `--color-text-secondary` | Body text and descriptions |
| `--color-border`         | Borders and dividers       |

### Button Colors

| Variable                          | Purpose                     |
| --------------------------------- | --------------------------- |
| `--color-button-primary-bg`       | Primary button background   |
| `--color-button-primary-text`     | Primary button text         |
| `--color-button-secondary-bg`     | Secondary button background |
| `--color-button-secondary-text`   | Secondary button text       |
| `--color-button-secondary-border` | Secondary button border     |

## How to Use Variables in Components

Use Tailwind's arbitrary value syntax to reference CSS variables:

### Backgrounds

```tsx
className="bg-[var(--color-background)]"
className="bg-[var(--color-surface)]"
className="bg-[var(--brand-primary)]"
```

### Text

```tsx
className="text-[var(--color-text-primary)]"
className="text-[var(--color-text-secondary)]"
className="text-[var(--brand-primary)]"
```

### Borders

```tsx
className="border-[var(--color-border)]"
className="border-[var(--brand-primary)]"
```

### Buttons

```tsx
// Primary button
className="bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)]"

// Secondary button
className="bg-[var(--color-button-secondary-bg)] text-[var(--color-button-secondary-text)] border border-[var(--color-button-secondary-border)]"
```

### Fonts

```tsx
className="font-sans"          // Uses --font-body via Tailwind @theme
className="font-heading"       // Uses --font-heading (set in globals.css on h1-h6)
```

## Rich Text

Use the shared `<RichText />` component from `components/RichText.tsx` for all Prismic rich text fields. It already applies the correct CSS variables for headings, paragraphs, and links.

```tsx
import { RichText } from "@/components/RichText";

<RichText field={slice.primary.description} />
```

## Rules

1. **Never use hardcoded Tailwind color classes** — No `text-gray-600`, `bg-black`, `text-white`, etc.
2. **Never use `dark:` variants** — The CSS variables handle theming; no dark mode variants needed.
3. **Always use semantic variables** — Pick the variable that matches the purpose (e.g., `--color-text-secondary` for body text, not `--brand-primary`).
4. **Use `<RichText />` for Prismic rich text** — Don't render `<PrismicRichText>` directly in slices.

## For AI Agents: Updating the Color Scheme

To update the site's colors, only modify `app/globals.css`:

1. Set `--brand-primary`, `--brand-secondary`, `--brand-accent` from brand colors
2. Set semantic colors for the desired mode:

**Light mode values:**

- `--color-background: #ffffff`
- `--color-surface: #f9fafb`
- `--color-text-primary: #171717`
- `--color-text-secondary: #6b7280`
- `--color-border: #e5e7eb`

**Dark mode values:**

- `--color-background: #0a0a0a`
- `--color-surface: #171717`
- `--color-text-primary: #f9fafb`
- `--color-text-secondary: #a1a1aa`
- `--color-border: #27272a`

3. Ensure button text has sufficient contrast with button background
