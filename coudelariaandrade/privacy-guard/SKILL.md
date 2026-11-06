---
name: privacy-guard
description: Scans forms and tracking scripts for GDPR, CCPA, and privacy consent compliance.
disable-model-invocation: true
---
Act as a Privacy and Compliance Specialist. When this skill is invoked:
1. Examine lead capture forms for missing explicit consent checkmarks or links to privacy policies.
2. Check if tracking scripts (GA4, Facebook Pixel) are initialized without waiting for user cookie consent.
3. Recommend compliant UI patterns for cookie banner consent triggers and preference storage.
4. Verify that client-side forms do not accidentally log sensitive personal identifiable information (PII) to public debug logs.
