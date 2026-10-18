# Verity — Server vs. Client Boundaries

This document maps each part of the Verity application to its execution context (Server Component, Client Component, or Server Action) and explains the reasoning. The starting point is the system boundaries table in section 7 of the product brief.

---

## Execution Context Mapping

| Component | Type | Reasoning |
|-----------|------|-----------|
| `app/page.tsx` (Home) | **Server Component** | Renders the initial page layout with chat and document panel. No interactivity needed at the root level; serves as a container for client components. |
| `app/chat.tsx` (Chat) | **Client Component** | Uses React hooks (`useState`) and the AI SDK's `useChat` hook for streaming responses, form state, and interactive UI. Must run on the client to handle user input and real-time streaming. |
| `app/document-panel.tsx` (DocumentPanel) | **Server Component** | Currently a static placeholder displaying an empty state. No interactivity or state management yet, so it can remain a Server Component. Will become a Client Component when document upload/selection is added. |
| `app/api/chat/route.ts` (Chat API) | **Server Action / Route Handler** | Next.js API route handler that runs server-side. Holds the GROQ_API_KEY, validates input, calls the AI SDK, and streams responses. Never runs on the client. |
| `app/layout.tsx` (Layout) | **Server Component** | Root layout that wraps the app with HTML structure and metadata. Standard Next.js App Router pattern; no client-side interactivity needed. |
| Future: Document upload handler | **Server Action** | Will validate file type, size, and content server-side before processing. Must run on the server to hold API keys and perform secure file operations. |
| Future: Document chunking/retrieval | **Server Action** | Will parse documents, create embeddings, and perform retrieval. Computationally expensive and requires server-side secrets (embedding provider). |
| Future: Tool-calling handlers (highlight, extract claims) | **Server Action** | Will validate tool inputs and execute actions server-side. Never trust client-provided tool parameters directly. |

---

## Key Principles

### Server Components
- Use for static or data-fetching components that don't need interactivity
- Can access server-side resources (databases, APIs with secrets) directly
- Reduce client-side JavaScript bundle size
- Examples: layout, page containers, static panels

### Client Components
- Required for any component using React hooks, event handlers, or browser APIs
- Use `"use client"` directive at the top of the file
- Examples: forms, streaming chat, interactive UI state

### Server Actions / Route Handlers
- Execute server-side in response to client requests
- Hold secrets (API keys, database credentials) and perform secure operations
- Validate all inputs from the client before processing
- Examples: API routes, form handlers, file upload processing

---

## Security Boundary

- **Client never holds secrets**: API keys, database credentials, and embedding provider keys are only accessible in Server Components and Server Actions
- **All user input is validated server-side**: The chat route validates message structure, length, and content before passing to the AI SDK
- **Document content is treated as untrusted**: When document upload is implemented, all parsing and processing happens server-side; the client only receives necessary snippets
- **Tool calls are server-mediated**: Any "highlight passage" or "extract claims" actions will be validated and executed server-side, not as direct client-to-model calls

---

## Future Migration Notes

As Verity grows:

1. **DocumentPanel** will become a Client Component when upload/selection is added
2. **Additional Server Actions** will be created for document processing, retrieval, and tool execution
3. **Rate limiting and authentication** will be added to the chat route as middleware or route handlers
4. **Structured output validation** will be added server-side before returning tool calls or citations to the client
