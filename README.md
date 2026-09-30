# Verity

Chat with a document and get answers you can actually check. Upload a PDF, ask questions, and every answer comes back with a citation pointing to the exact passage it came from — plus an honest "not covered in this document" state when it doesn't.

Built as the ongoing project for a 14-week AI-native frontend internship track. See [`docs/product-brief.md`](docs/product-brief.md) for the full product brief, user flows, and system boundaries, and [`docs/system-diagram.md`](docs/system-diagram.md) for the architecture.

## Status
Week 1

## Tech stack

- **Framework:** Next.js (App Router) + TypeScript
- **AI integration:** Vercel AI SDK (`ai` + `@ai-sdk/groq`)
- **Model provider:** Groq (`openai/gpt-oss-120b`)
- **Deployment:** Vercel, auto-deployed on push

## Running locally

```bash
npm install
npm run dev
```

Requires a `.env.local` with:

```
GROQ_API_KEY=your_key_here
```


## Live URL
https://verity-mu-one.vercel.app/
## Docs

- [Product brief](docs/product-brief.md)
- [System diagram](docs/system-diagram.md)
- [Risk register](docs/risk-register.md)
