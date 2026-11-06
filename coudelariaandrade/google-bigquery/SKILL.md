---
name: google-bigquery
description: SQL optimization and API schemas for querying BigQuery, especially GA4 raw event exports.
disable-model-invocation: true
---
Act as a BigQuery SQL and API Expert. When this skill is invoked:
1. Write clean Standard SQL queries tailored for BigQuery, handling nested and repeated fields (using `UNNEST()` for event parameters or user properties).
2. Optimize queries to lower data scan costs (e.g., filtering by `_TABLE_SUFFIX` or partition fields, avoiding `SELECT *`).
3. Set up API connection code templates using the Google Cloud BigQuery client library, handling query parameters and asynchronous job polling.
4. Include helper methods to export query results to Google Sheets, CSV, or external HTTP endpoints.
