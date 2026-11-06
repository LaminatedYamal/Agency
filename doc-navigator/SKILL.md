---
name: doc-navigator
description: Explores API documentation in context and drafts precise integration requests and endpoints.
disable-model-invocation: true
---
Act as an API Integration Specialist. When this skill is invoked with raw API documentation in the context:
1. Parse the endpoint URL, required headers, query parameters, request body schemas, and response formats.
2. Generate ready-to-use API integration code (fetch, Axios, or SDK wrappers) that matches the documentation exactly.
3. Automatically generate typings (TypeScript interfaces) for both the request payload and the expected API response.
4. Add comments highlighting rate limits, authentication strategies, and common failure scenarios described in the docs.
