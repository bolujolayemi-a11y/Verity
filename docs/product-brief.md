# Verity — Product Brief

**Module 1 deliverable — AI-Native Frontend Internship, Week 1**

---

## 1. Product summary

Verity is a document-chat product: a user uploads a document (a research paper, report, or reference PDF), and Verity lets them ask questions about it in a streaming chat interface. Every answer is grounded in the source document, with visible citations pointing back to the exact passage the answer came from, an honest "I don't have enough context" state when the document doesn't support an answer, and a source-inspection view so the user can check the AI's work rather than trust it blindly.

The name is deliberate: the product's job is to let a user *verify* what a document says, not just summarize it.

---

## 2. Target users

- Students and researchers who need to extract specific claims from a paper without re-reading the whole thing
- Anyone who needs to trust an AI answer enough to cite it themselves, and therefore needs to see where it came from

## 3. Jobs-to-be-done

- "Help me find where this document actually says X"
- "Summarize the key claims of this document, and let me check each one"
- "Tell me if this document answers my question at all — don't guess"

## 4. Core AI use cases

1. **Grounded Q&A** — answer questions using only the uploaded document as context
2. **Claim extraction** — pull out the document's key claims as structured, checkable items
3. **Source-grounded explanation** — explain a passage using the surrounding context in the same document

## 5. Non-goals (v1 scope boundary)

To keep this buildable solo in 14 weeks, Verity v1 does **not**:
- Support multiple documents in one conversation (single document per session)
- Support arbitrary file types beyond PDF/text at launch
- Attempt cross-document synthesis or a document library/search feature
- Do OCR for scanned/image-only PDFs
These can become "future work" items in the final writeup, but are explicitly out of scope for the 14-week build.

---

## 6. User flows

### Flow A — Upload and first question
1. User lands on the app, uploads a document
2. Document is parsed/chunked (Week 6+); until then, short documents are passed in full context
3. User types a question in the chat input
4. Response streams in, with inline citation markers
5. User clicks a citation → source panel scrolls to and highlights the referenced passage

### Flow B — Low-confidence / no-result
1. User asks a question the document doesn't address
2. Verity returns an explicit "not covered in this document" state instead of guessing
3. UI offers to broaden the question or confirms no relevant passage was found

### Flow C — Review/approval (tool-calling, Week 5)
1. User asks Verity to "highlight all passages about X"
2. Verity proposes the action (which passages, how many) before executing
3. User approves → passages are highlighted in the source panel

### Flow D — Fallback / error state
1. Model call fails, times out, or returns invalid structured output
2. UI shows a clear error state with a retry action, never a silent failure or raw error string

---

## 7. System boundaries — client, server, model, tools

| Layer | Responsibility |
|---|---|
| **Client (browser)** | Renders chat UI, document viewer, citation highlighting, streaming display. Never holds API keys. Sends user messages + document reference to the server. |
| **Server (Next.js route handlers / server actions)** | Owns the AI SDK calls, holds API keys, runs document chunking/retrieval, validates all tool inputs, enforces rate limits. |
| **Model layer (Anthropic via Vercel AI SDK)** | Generates responses, structured claim extraction, and tool calls. Swappable provider — code doesn't hardcode to one vendor. |
| **Data layer** | Document storage, chunk/embedding store (from Week 6), conversation history, feedback records (from Week 13). |
| **External tools** | "Highlight passage" and "extract claims" are server-validated actions, not direct client-to-model side effects. |

**Privacy boundary:** raw document content and any embeddings never reach the client in bulk — only the specific retrieved snippets needed to render an answer are sent down.

---

## 8. Acceptance criteria

- **Accuracy:** answers must be traceable to a specific passage; no citation = flagged as ungrounded in the UI
- **Latency:** first token of a streamed response appears in under ~2s for a cached/short document
- **Accessibility:** chat is fully keyboard-navigable; streaming status is announced via ARIA live regions
- **Safety:** no raw HTML from model output is rendered unsanitized; document content cannot inject instructions that override system behavior
- **UX quality:** a user can always tell the difference between "answered from the document" and "the document doesn't say"

---

## 9. Risk register

| Risk | Mitigation |
|---|---|
| Prompt injection via malicious document content (e.g. hidden text saying "ignore instructions") | Treat document content as untrusted data, never as instructions; sanitize before including in context (Week 9) |
| Hallucinated citations (model cites a passage that doesn't say what it claims) | Structured citation format tied to actual retrieved chunk IDs, not free-text page guesses (Week 6) |
| Leaking full document content to the client when only a snippet is needed | Server only ever returns the specific retrieved snippets, not the full parsed document, in API responses |
| Uploaded documents containing sensitive personal data | Document storage scoped per user/session; no cross-user access; retention policy documented (Week 9) |
| Over-trusting AI output because citations *look* authoritative | Visible confidence state and "no result" state are first-class UI, not an afterthought |

---

## 10. Early state-management notes

- Conversation history: held client-side during a session, persisted server-side from Week 13 onward
- Document reference: session-scoped identifier, not the raw file, passed between client and server
- Saved preferences (e.g. citation display style): deferred until persistence lands in Week 13

---

## 11. Technical decisions (Module 1 requirements)

- **Model provider:** Groq (`@ai-sdk/groq`), accessed via the Vercel AI SDK — swappable later since the AI SDK abstracts the provider from the frontend code. Chosen for fast inference and prior familiarity from other projects.
  - Model: `openai/gpt-oss-120b`
  - Known trade-off: structured-output schema adherence is less consistent than with Claude/GPT-4-class models, so Week 5's fallback-UI requirement is treated as load-bearing, not optional, for this provider choice
- **Framework:** Next.js App Router + TypeScript
- **Deployment:** GitHub repo connected to Vercel, auto-deploying on every push; live URL submitted with every module from here on

---

## 12. What ships this week

- [ ] The product brief
- [ ] System boundary diagram (client/server/model/data)
- [ ] Risk register (above)
- [ ] README
- [ ] GitHub repo connected to Vercel, live URL confirmed