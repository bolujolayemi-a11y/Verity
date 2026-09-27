# Risk Register

**Module 1 deliverable — AI-Native Frontend Internship, Week 1**

| Risk | Mitigation |
|---|---|
| Prompt injection via malicious document content (e.g. hidden text saying "ignore instructions") | Treat document content as untrusted data, never as instructions; sanitize before including in context (Week 9) |
| Hallucinated citations (model cites a passage that doesn't say what it claims) | Structured citation format tied to actual retrieved chunk IDs, not free-text page guesses (Week 6) |
| Leaking full document content to the client when only a snippet is needed | Server only ever returns the specific retrieved snippets, not the full parsed document, in API responses |
| Uploaded documents containing sensitive personal data | Document storage scoped per user/session; no cross-user access; retention policy documented (Week 9) |
| Over-trusting AI output because citations *look* authoritative | Visible confidence state and "no result" state are first-class UI, not an afterthought |
| Groq's weaker structured-output schema adherence vs. Claude/GPT-4-class models | Defensive parsing and visible fallback UI for invalid/partial structured output are treated as required, not optional (Week 5) |