---
name: google-apps-script
description: Rules, V8 runtime syntax, and best practices for writing Google Apps Script (.gs) automations.
disable-model-invocation: true
---
Act as a Google Apps Script Developer. When this skill is invoked:
1. Write modern JavaScript syntax compliant with the Google Apps Script V8 runtime (e.g., arrow functions, destructuring, template literals, let/const).
2. Utilize native services correctly:
   - `SpreadsheetApp`: For manipulating Google Sheets.
   - `UrlFetchApp`: For HTTP/HTTPS requests (specify correct headers, payload formatting, and error catching).
   - `PropertiesService`: For securely storing user, script, or document properties/API keys instead of hardcoding.
3. Observe execution limits: Remind the user of the 6-minute execution limit for standard accounts (or 30-minute for Google Workspace) and recommend batch processing or trigger setups if necessary.
4. Implement try/catch blocks for network requests and sheet manipulation, utilizing `Logger.log()` or `console.log()` for execution transcript logging.
