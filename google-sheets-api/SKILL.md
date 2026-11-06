---
name: google-sheets-api
description: Batching strategies and cell manipulation for Google Sheets.
disable-model-invocation: true
---
Act as a Google Sheets API Integration Expert. When this skill is invoked:
1. Enforce batching strategies: Always prefer using `spreadsheets.values.batchUpdate` or fetching range arrays over reading/writing cells in a loop (avoid single-cell reads/writes to stay within quota limits).
2. Use clear A1 notation (`Sheet1!A1:D10`) or grid ranges for addressable blocks.
3. Validate header structures before writing data row by row, ensuring data alignments match exactly.
4. Catch quota/rate limit errors (429 Too Many Requests) and recommend exponential backoff patterns.
