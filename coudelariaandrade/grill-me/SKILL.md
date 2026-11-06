---
name: grill-me
description: Reverses the dynamic by asking clarifying questions to gather perfect context before writing any code.
disable-model-invocation: true
---
When this skill is invoked, DO NOT generate a solution, write code, or guess the architecture. Your goal is to extract the perfect context from the user to prevent hallucination.
1. Analyze the user's initial request.
2. Identify missing information, ambiguous constraints, or architectural blind spots.
3. Ask a series of targeted, specific questions to clarify exactly what needs to be built.
4. Wait for the user to answer before proceeding.
