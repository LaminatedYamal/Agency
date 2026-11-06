---
name: commit-crafter
description: Analyzes the current git diff and generates a structured, conventional commit message.
disable-model-invocation: true
---
When this skill is invoked, run `git diff` or look at the files provided in the context. Draft a commit message using the following strict format: `<type>(<scope>): <short summary in present tense>`. Provide a bulleted body explaining *what* changed and *why*. Output the result in a clean block. Do not run the commit command.
