---
name: html-to-prismic-slice
description: Converts HTML markup into Prismic Slice components with model.json definitions and React component files. Use when the user wants to turn HTML into a Prismic Slice, create a slice from HTML, or convert markup to Prismic.
---

# HTML to Prismic Slice Converter

Converts HTML into Prismic Slices: analyzes structure, generates `model.json`, creates the React slice component, and registers it. When applying this skill, also apply **refactor-react-a11y** for accessibility and **consistency** after creating the slice.

## Step 0: Check Existing Slices (Variations First)

**Before creating a new slice, always check for similar slices.**

1. List slices: `slices/index.ts` or `ls slices/`
2. If similar purpose exists (e.g. Hero, Feature), read its `model.json`
3. **Prefer adding a variation** to an existing slice over creating a new one

**Create a VARIATION when:** Same layout/purpose, similar fields, different arrangement (e.g. "Hero with video" → add variation to Hero).

**Create a NEW slice when:** Different purpose or content structure, no matching slice.

**If adding a variation:** Read existing `model.json`, add object to `variations` array, reuse fields when possible, update component with `slice.variation` branching.

## Step 1: Analyze the HTML

- Parse structure; identify sections, text, images, links, repeating blocks
- Note custom CSS variables (e.g. `bg-background-primary`, `text-text-alternative`) for Tailwind v4
- Identify what belongs in `primary` vs `items` (repeating)

## Step 2: Slice Name

- Ask user for slice name if not obvious (e.g. "hero", "testimonials", "features")
- Directory: kebab-case. Component: PascalCase.

## Step 3: CSS Variables (Tailwind v4)

If HTML uses custom tokens not in `app/globals.css`:

- Add variables to `:root` (and dark mode if needed)
- Add to `@theme inline` so Tailwind can use them (e.g. `--color-background-primary: var(--background-primary);`)

Skip if no new variables are needed.

## Step 4: Generate model.json

Consult [reference.md](reference.md) for field types and JSON shape.

- `primary`: non-repeating (heading, intro, featured image)
- `items`: repeating (cards, testimonials, list items)

Common mappings: simple text → `Text`; headings → `StructuredText` single; rich paragraphs → `StructuredText` multi; images → `Image`; links/buttons → `Link`; style options → `Select`; toggles → `Boolean`.

Structure:

```json
{
  "id": "slice_id",
  "type": "SharedSlice",
  "name": "SliceName",
  "description": "Short description",
  "variations": [
    {
      "id": "default",
      "name": "Default",
      "docURL": "...",
      "version": "initial",
      "description": "Default",
      "imageUrl": "",
      "primary": { },
      "items": { }
    }
  ]
}
```

## Step 5: React Component

Create `slices/[slice-name]/index.tsx`:

- Use `@prismicio/next` for images and links (`PrismicNextImage`, `PrismicNextLink`)
- Use `@prismicio/react` for rich text (`PrismicRichText`)
- Preserve original HTML structure and CSS classes
- Add `data-slice-type` and `data-slice-variation` on the section
- Type props from generated types (e.g. `Content.SliceNameSlice`)

### PrismicRichText: Use `components` Only

**Always style via the `components` prop. Never wrap `PrismicRichText` in a div with a className.**

❌ Wrong:

```tsx
<div className="body-text">
  <PrismicRichText field={slice.primary.description} />
</div>
```

✅ Correct:

```tsx
<PrismicRichText
  field={slice.primary.description}
  components={{
    paragraph: ({ children }) => <p className="body-text">{children}</p>,
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
  }}
/>
```

For headings, map to the right tag and class:

```tsx
<PrismicRichText
  field={slice.primary.heading}
  components={{
    heading1: ({ children }) => <h1 className="heading-1">{children}</h1>,
    heading2: ({ children }) => <h2 className="heading-2">{children}</h2>,
  }}
/>
```

Available in `components`: `heading1`–`heading6`, `paragraph`, `strong`, `em`, `hyperlink`, `list`, `listItem`, `oList`, `oListItem`, `preformatted`, `embed`, `image`.

## Step 6: Slice Registry

Update `slices/index.ts`: add the new slice to the `components` object (same pattern as existing slices, e.g. `slice_name: dynamic(() => import("./SliceName"))`).

## Step 7: Consistency and Types

- Invoke the **consistency** skill so the new slice matches project style (Tailwind, spacing, dark mode).
- Tell the user to run `npm run slicemachine` and push the slice from the Slice Machine UI (e.g. http://localhost:9999).

## Best Practices

- Prefer variations over new slices when structure is similar
- Always use `components` for `PrismicRichText`; never wrapper divs
- Semantic field names: `heading`, `description`, `feature_list`
- Put repeating content in `items`
- Keep semantic HTML and run refactor-react-a11y where relevant

## Additional Resources

- [reference.md](reference.md) – Field types, model.json examples, React usage
- [examples.md](examples.md) – Full slice and variation examples
- [Prismic Slices](https://prismic.io/docs/slices) · [Field Types](https://prismic.io/docs/fields) · [@prismicio/react](https://prismic.io/docs/technical-reference/prismicio-react/v3.md) · [@prismicio/next](https://prismic.io/docs/technologies/nextjs)
