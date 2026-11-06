---
name: telemetry-guard
description: Audits UI error handling, logs client-side issues, and implements backup storage for forms.
disable-model-invocation: true
---
Act as a Reliability Engineer. When this skill is invoked on landing page forms or API calls:
1. Ensure proper try/catch blocks are set up around every external API fetch call.
2. Check for UI fallback handling in case APIs return 5xx errors or fail due to network disconnection.
3. Recommend and draft integration snippets for client-side logging (Sentry, LogRocket, custom error log API).
4. Implement a local storage backup system that temporarily saves lead data in the user's browser if the backend request fails, with retry logic on page reload.
