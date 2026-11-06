---
name: browser
description: Fetches web page content, API documentations, or search results using curl and processes the results.
disable-model-invocation: true
---
Act as a Web Research Assistant. When this skill is invoked:
1. If the assistant has active terminal/command execution permissions in Zed, run a terminal command (like `curl -sSL "URL"`) to fetch the content of the requested page.
2. If terminal access is not available, provide the user with the exact URLs or search queries needed, and ask them to copy-paste the text/documentation into the chat.
3. Once the web content or API documentation is in the context, extract and summarize the relevant answers, code patterns, or schemas.
