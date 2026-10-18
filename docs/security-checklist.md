# Verity — Security Checklist

This checklist summarizes the key security controls for secret handling and input boundaries. For detailed risk analysis, see the [risk register](./risk-register.md).

---

## Secret Handling

- [ ] **API keys are server-side only**
  - GROQ_API_KEY is read from `process.env` in route handlers/Server Actions
  - Never use `NEXT_PUBLIC_` prefixed variables for secrets
  - Verify deployment platform (Vercel) has the key configured in environment settings

- [ ] **Local environment files are excluded from Git**
  - `.env*` files are in `.gitignore`
  - Only `.env.example` (with empty values) is committed
  - Verify with: `git ls-files | grep .env` (should only list `.env.example`)

- [ ] **Secrets are never logged or exposed in error messages**
  - Error responses do not include API keys or sensitive configuration
  - Client-facing errors are generic and do not leak server state

- [ ] **Production secrets are managed in deployment platform**
  - Secrets are configured in Vercel environment variables
  - Secrets are rotated if compromised
  - No hardcoded values in source code

---

## Input Validation

- [ ] **All client input is validated server-side**
  - Request body is parsed with try/catch and type checking
  - Message structure is validated against expected schema
  - Invalid input returns 400 with clear error message

- [ ] **Request size is capped**
  - Maximum message count enforced (currently 40 messages)
  - Request body byte limit enforced before parsing
  - Per-message size limits enforced

- [ ] **Message content is sanitized**
  - System messages are rejected from client input
  - Conversation must end with a user message
  - No raw HTML from model output is rendered unsanitized

- [ ] **Rate limiting and abuse protection**
  - [ ] Rate limiting on chat endpoint (not yet implemented)
  - [ ] Provider spending limits configured (not yet implemented)
  - [ ] Deployment usage alerts configured (not yet implemented)

---

## Document Handling (Future)

When document upload is implemented:

- [ ] **File type and size validation**
  - Only allowed file types (PDF, text) are accepted
  - Maximum file size enforced before processing
  - File content is scanned for malicious patterns

- [ ] **Document content is treated as untrusted**
  - Extracted text is never used as system instructions
  - Document content is isolated from prompt instructions
  - No direct client access to full document content

- [ ] **Access control**
  - Documents are scoped per user/session
  - No cross-user document access
  - Retention and deletion policies documented

---

## Provider Failure Handling

- [ ] **Clear error states for failures**
  - Provider timeouts are caught and displayed
  - Invalid model output is caught and rejected
  - Retry mechanism is available to users

- [ ] **Structured output validation**
  - Tool calls and citations are validated before use
  - Invalid structured output triggers fallback UI
  - No untrusted model output is executed

---

## Pre-Deployment Checklist

Before each deployment:

- [ ] Run `npm audit` and address high-severity vulnerabilities
- [ ] Verify `.env.example` is the only `.env*` file in Git
- [ ] Confirm production secrets are configured in deployment platform
- [ ] Test chat endpoint with valid and invalid inputs
- [ ] Verify error states are user-friendly and do not leak information
- [ ] Review risk register for any new risks introduced by changes
