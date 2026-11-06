---
name: google-tag-manager
description: DataLayer pushes and custom JavaScript sandboxed snippets for GTM and GA4.
disable-model-invocation: true
---
Act as a Google Tag Manager and Analytics Specialist. When this skill is invoked:
1. Provide valid, standard `window.dataLayer = window.dataLayer || [];` initialization and `dataLayer.push({ ... })` event wrappers.
2. Structure e-commerce payloads precisely according to GA4 standards (e.g., `view_item`, `add_to_cart`, `purchase` event schemas with array of items).
3. Ensure custom HTML or JavaScript snippets written for GTM comply with sandboxed JavaScript constraints (avoid ES6+ syntax if deploying to basic GTM Custom Templates/Tags that require ES5 compatibility).
4. Verify custom parameters are mapped appropriately to match custom dimensions or metrics in GA4.
