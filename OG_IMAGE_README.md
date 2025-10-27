# Open Graph Image Setup for X/Twitter Preview

## What Was Fixed

The X (Twitter) preview wasn't showing because the Open Graph image metadata was pointing to a non-existent image at `https://app.getmin.ai/og-image.png`.

## Solution

1. **Created a custom OG image** (`public/og-image.png`) with dimensions 1200x630px (Twitter's recommended size)
2. **Updated metadata** in both `index.html` and `src/pages/Index.tsx` to point to the correct image URL: `https://getmin.ai/og-image.png`
3. **Enhanced Twitter Card metadata** with additional fields for better X/Twitter integration

## OG Image Design

The image features:
- Clean gradient background with subtle patterns matching your brand
- "min." logo
- Main headline: "AI-Powered Team Inbox"
- Subheadline: "for Lean Teams & AI Agents"
- Concise description of what min. does
- Three key features: AI Auto-Triage, Team Collaboration, 2-Min Setup
- Domain and tagline at the bottom

## Regenerating the OG Image

If you need to update the OG image design in the future:

1. Edit `public/og-image.html` to change the design
2. Run: `npm run generate-og-image`
3. The new `public/og-image.png` will be automatically generated
4. Rebuild your site: `npm run build`

## Testing the X/Twitter Preview

To test how your link appears on X/Twitter:

1. Use the Twitter Card Validator: https://cards-dev.twitter.com/validator
2. Enter your URL: https://getmin.ai/
3. Verify the preview shows your custom OG image

Note: X/Twitter caches previews for about a week, so if you recently shared the link, you may need to wait or use the validator to refresh the cache.

## Files Modified

- `index.html` - Updated Open Graph and Twitter Card metadata
- `src/pages/Index.tsx` - Updated Helmet component with image metadata
- `public/og-image.png` - New OG image file (347KB)
- `public/og-image.html` - Template for generating the OG image
- `generate-og-image.js` - Script to generate the OG image
- `package.json` - Added `generate-og-image` script

## Metadata Added

### Open Graph (Facebook, LinkedIn, etc.)
- `og:image`: Image URL
- `og:image:width`: 1200
- `og:image:height`: 630
- `og:image:alt`: Descriptive alt text

### Twitter Card
- `twitter:card`: summary_large_image
- `twitter:image`: Image URL
- `twitter:image:alt`: Descriptive alt text
- `twitter:site`: @getminai
- `twitter:creator`: @getminai

