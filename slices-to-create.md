# Slices to create

## Components

### Header ✅ done
- variation: Default ✅
  - component: `components/relume/Header23.tsx`
- variation: With Bottom Image ✅
  - component: `components/relume/Header26.tsx`
- variation: Two Cols With Image ✅
  - components: image on the left `components/relume/Header19.tsx` & image on the right `components/relume/Header1.tsx` (use boolean)
  - comment: use a boolean field for the image side
- variation: Two Cols With Full Size Image ✅
  - components: image on the left `components/relume/Header37.tsx` & image on the right `components/relume/Header36.tsx`
  - comment: Don't add the buttons, use a boolean field for the image side
- variation: With Background Image ✅
  - component: `components/relume/Header5.tsx`

### FeaturedContent ✅ done
- variation: Default ✅
  - component: `components/relume/Blog68.tsx`
- variation: Content Relationship ✅
  - component: `components/relume/Blog68.tsx`
  - comment: use content relationships for linked articles
- variation: Background Image Cards ✅
  - component: `components/relume/Layout521.tsx`
  - comment: Always center the cards, minimum 1 card and maximum 4 cards per row, adapt the width of the cards to the available space like 2 cards `components/relume/Layout519.tsx` and 3 cards `components/relume/Layout520.tsx` all in 1 slice variation

### CallToAction ✅ done
- variation: Default ✅
  - component: `components/relume/Cta25.tsx`
  - comment: use a boolean for text align center or left
- variation: With Background Image ✅
  - component: `components/relume/Cta3.tsx`
  - comment: use a boolean for text align center or left
- variation: With Background Color ✅
  - component: `components/relume/Cta55.tsx`
  - comment: use a boolean for text align center or left
- variation: Two Cols ✅
  - component: `components/relume/Cta7.tsx`
- variation: Two Cols Text and Image ✅
  - component: `components/relume/Cta1.tsx`
  - comment:use a boolean field for the image side
- variation: Two Cols Featured Collection ✅
  - components: image on the left `components/relume/Header37.tsx` & image on the right `components/relume/Header36.tsx`
  - comment: use a text field for collection reference use a boolean field for the image side, buttons are optionals and should not be displayed in not filled with content.
- variation: Two Cols Featured Product ✅
  - components: image on the left `components/relume/Header37.tsx` & image on the right `components/relume/Header36.tsx`
  - comment: use a text field for product reference (will query the producat database and pull it's name and image) use a boolean field for the image side, buttons are optionals and should not be displayed in not filled with content.
- variation: IF Two Cols Featured Collection ✅
  - components: image on the left `components/relume/Header37.tsx` & image on the right `components/relume/Header36.tsx`
  - comment: use an integration field for collection reference use a boolean field for the image side, buttons are optionals and should not be displayed in not filled with content.
- variation: IF Two Cols Featured Product ✅
  - components: image on the left `components/relume/Header37.tsx` & image on the right `components/relume/Header36.tsx`
  - comment: use an integration field for product reference (will query the producat database and pull it's name and image) use a boolean field for the image side, buttons are optionals and should not be displayed in not filled with content.

### ProductList ✅ done
- variation: Carrousel 4 Cols ✅
  - component: `components/relume/Product5.tsx`
- variation: Carrousel 3 Cols ✅
  - component: `components/relume/Product11.tsx`
- variation: Grid 4 Cols ✅
  - component: `components/relume/Product1.tsx`
- variation: Grid 3 Cols ✅
  - component: `components/relume/Product7.tsx`

### EditorialContent ✅ done
- variation: Default Rich Text ✅
  - component: `components/relume/Content29.tsx`
  - comment: Use a RichText, don't add quote. Based on the formating options of `components/relume/Content27.tsx` and ommiting the table of content, create a global RichText component following this documentation https://prismic.io/docs/fields/rich-text#use-custom-ui-components-globally
- variation: Two Cols Text and Image ✅
  - components: image on the left `components/relume/Content2.tsx` & image on the right `components/relume/Content1.tsx`
  - comment: use a boolean field for the image side
- variation: Two Cols With Full Size Image ✅
  - components: image on the left `components/relume/Header37.tsx` & image on the right `components/relume/Header36.tsx`
  - comment: use a boolean field for the image side, buttons are optionals and should not be displayed in not filled with content.
- variation: Quote ✅
  - component: `components/relume/Content29.tsx`
  - comment: use the quote part of the component
- variation: Two Cols Image and text ✅
  - components: `components/relume/Layout3.tsx`
  - comment: use a boolean field for the image side

### Media ✅ done
- variation: Image ✅
  - component: `components/relume/Content29.tsx`
  - comment: Use the image and add a caption under it using an image field and a rich text field, ommit the rest of the component. If caption is not filled, don't display it
- variation: Video ✅
  - component: `components/relume/Content29.tsx`
  - comment: Use the image example but for a video and add a caption under it using an embed field and a rich text field, ommit the rest of the component. If caption is not filled, don't display it

### ImageGallery ✅ done
- variation: Two Cols ✅
  - component: `components/relume/Gallery2.tsx`
  - comment: if caption is not filled, don't display it
- variation: Three Cols ✅
  - component: `components/relume/Gallery3.tsx`
  - comment: if caption is not filled, don't display it

## Addional instructions

- Update the global rich text component in `/components/RichText.tsx` to centralize formating options styles based on relumes components
- Create a global `/components/Button.tsx` to handle link field's types and variants
- Use styling variables and if some are missing, add them to `app/global.css`
- Rely on reusable components as much as possible
- Keep the spacings, paddings, border radius and container width consistant, create styling variables for them if necessary
- For slice variations with 2 columns including one that contains an image or video, add a boolean field to let editors switch the media side