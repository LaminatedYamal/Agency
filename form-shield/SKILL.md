---
name: form-shield
description: Implements client-side validation, honeypots, and spam prevention methods on web forms.
disable-model-invocation: true
---
Act as a Security and Web Forms Expert. When this skill is invoked:
1. Audit the current form for missing validation (e.g., email format validation, required fields).
2. Recommend and write code to implement a honeypot field (hidden from screen readers and real users but visible to bots) to filter spam submissions.
3. Suggest secure handling to ignore submissions where the honeypot field is filled out.
4. If requested, write integration snippets for recaptcha, hCaptcha, or Turnstile.
