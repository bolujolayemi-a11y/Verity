# Reflection: why use the AI SDK?

The AI SDK sits between Verity's model provider and its chat interface. It is the seam where AI meets the frontend framework: everything provider-specific stays on the server side of it, and everything React-specific stays on the UI side.

On the server, the provider adapter gives the application a consistent way to call Groq and stream a response without putting the Groq API key in the browser. If Verity changes providers, the server-side model configuration can change without rewriting the chat interface. The UI code would stay the same, but I would still need to re-test output quality, since providers differ in behavior. Groq's structured-output reliability, which I flagged as a risk in the product brief, is one example.

On the client, the AI SDK's `useChat` hook manages conversation state and streamed message parts. The UI can focus on rendering messages and handling input instead of implementing a streaming protocol. This keeps the provider choice separate from how the user interacts with the product.

The current chat route is only a foundation: it has no document context and must not be treated as source-grounded Q&A. When upload is implemented, file validation, parsing, and document context assembly belong on the server. The client should send a document reference and display only the relevant answer and citations.