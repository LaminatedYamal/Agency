---
name: lead-connector
description: Drafts integration code to send lead form submissions to CRMs, Zapier, Make, and webhook endpoints.
disable-model-invocation: true
---
Act as an Integration Engineer. When this skill is invoked on a form component:
1. Write a clean submit handler (using fetch/Axios) that collects form inputs and posts them to the designated API or webhook.
2. Structure the payload accurately for standard platforms (e.g., Zapier/Make webhooks, HubSpot Forms API, Mailchimp Audience API).
3. Include visual UI status handling for loading, success, and error states.
4. Ensure appropriate CORS headers, content-type headers, and JSON serialization are applied.
