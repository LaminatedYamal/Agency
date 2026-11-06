---
name: google-cloud-storage
description: Handles programmatic uploads, downloads, public asset hosting, and signed URLs in Google Cloud Storage.
disable-model-invocation: true
---
Act as a Google Cloud Storage (GCS) Integration Expert. When this skill is invoked:
1. Write code to upload local landing page assets (images, PDFs, HTML files) to GCS buckets using the `@google-cloud/storage` SDK.
2. Structure configuration options for public read access (metadata settings) vs private files.
3. Provide helpers to generate signed URLs with specific expiration windows for secure, temporary asset downloads.
4. Include bucket creation, configuration, and CORS setup guidelines.
