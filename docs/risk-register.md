# Verity — Risk Register

This register tracks product, security, privacy, and operational risks across
the full project. Status describes the current implementation, not just the
planned mitigation.

**Status key:** **In place** = implemented; **Partial** = some controls exist;
**Open** = mitigation remains to be implemented; **Verify** = confirm before
deployment or release.

| ID | Risk and impact | Severity | Mitigation / next action | Status |
|---|---|---|---|---|
| R1 | **API key exposure or misuse.** A leaked Groq key can allow unauthorized model usage and incur charges. | High | Keep the key in server-only environment configuration, never use a `NEXT_PUBLIC_` variable, and keep local env files out of Git. Revoke and replace any exposed key; configure production secrets in the deployment platform. | **Partial** — the route reads the key server-side and `.env*` files are ignored. Verify the local and deployment secrets are current and unexposed. |
| R2 | **Unauthenticated endpoint abuse.** The public chat route can be called repeatedly, increasing provider costs or exhausting service limits. | High | Add rate limiting and abuse monitoring; set provider spending limits and deployment usage alerts. Add authentication if the product becomes account-based. | **Open** — no rate limiting or authentication is implemented. |
| R3 | **Oversized or malformed requests.** Large bodies or expensive message histories can consume memory, time, and model tokens. | Medium | Enforce a request-body byte limit before parsing, validate all client-supplied data, cap conversation length and message size, and set model token/time limits. | **Partial** — UI messages are validated and conversations are limited to 40 messages. Body-size, per-message, token, and timeout limits are not implemented. |
| R4 | **Malicious document text influences model behavior.** Prompt injection in uploaded files could cause unsafe or unrelated responses once ingestion is added. | High | Treat extracted text as untrusted data, isolate it from system instructions, limit the context supplied to the model, and test with malicious documents. | **Open** — there is no upload, parsing, or document context yet. |
| R5 | **Sensitive document disclosure or cross-user access.** Private content could be exposed through storage, logs, prompts, or responses. | High | Define access control, storage encryption, retention/deletion, and logging rules before adding uploads. Keep full files and parsed text server-side and return only necessary passages. | **Open** — document storage and user/session access control are not implemented. |
| R6 | **Unsupported answers or fabricated citations.** Users could mistake plausible model output or invented citations for verified evidence. | High | Ground answers only in retrieved passages, validate each source reference against retrieved content, and show a clear “not covered” state when evidence is insufficient. | **Open** — `Source` is typed, but retrieval, citation validation, and grounded answer behavior are not implemented. |
| R7 | **Provider failure or invalid model output.** Outages, timeouts, or unexpected output could interrupt chat or be shown as trustworthy content. | Medium | Handle provider failures with a clear retry state; validate structured output before acting on it; do not render model HTML as trusted markup. | **Partial** — the UI has an error/retry state and currently renders text as React text. Structured-output validation and explicit timeout handling remain open. |
| R8 | **Vulnerable or incompatible dependencies.** A vulnerable transitive package can expose the app to known issues; rushed upgrades can break the app. | Medium | Re-run `npm audit` before releases, update within compatible framework versions, and run build/lint after dependency changes. | **Verify** — a previous audit reported high-severity issues in a development dependency chain; recheck the current lockfile before release. |
| R9 | **Deployment configuration differs from local setup.** Missing server-side secrets or incorrect environment configuration can make chat unavailable or expose credentials. | Medium | Configure secrets in the hosting provider, verify production build and route behavior, and never put secrets in client-visible variables or logs. | **Verify** — local build succeeds; production environment configuration must be checked in the deployment dashboard. |

Review this register whenever a new capability changes the trust boundary,
especially before implementing document uploads, storage, retrieval, or tools.
