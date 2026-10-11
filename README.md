# Verity

Chat with a document and get answers you can actually check. Upload a PDF, ask questions, and every answer comes back with a citation pointing to the exact passage it came from — plus an honest "not covered in this document" state when it doesn't.
See [`docs/product-brief.md`](docs/product-brief.md) for the full product brief, user flows, and system boundaries, and [`docs/system-diagram.md`](docs/system-diagram.md) for the architecture.

## Status

- [x] Week 1 — product planning
- [x] Week 2 — app scaffolding and AI integration
- [ ] Week 3 — in progress

## Tech stack

- **Framework:** Next.js (App Router) + TypeScript
- **AI integration:** Vercel AI SDK (`ai` + `@ai-sdk/groq`)
- **Model provider:** Groq (`openai/gpt-oss-120b`)
- **Deployment:** Vercel, auto-deployed on push

## Running locally

Install the app dependencies from the repository root:

```bash
npm install --prefix verity
npm run dev
```

The app's Next.js project and package scripts are in [`verity/`](verity/).
Root-level `dev`, `build`, `start`, and `lint` scripts forward to that app.

To enable chat, create `verity/.env.local` with:

```
GROQ_API_KEY=your_key_here
```


## Live URL

https://verity-mu-one.vercel.app/ 

## Docs

- [Product brief](docs/product-brief.md)
- [System diagram](docs/system-diagram.md)
- [Risk register](docs/risk-register.md)
- [AI SDK reflection](docs/ai-sdk-reflection.md)