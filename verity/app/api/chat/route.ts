import { groq } from "@ai-sdk/groq";
import {
  convertToModelMessages,
  safeValidateUIMessages,
  streamText,
} from "ai";
import type { Message } from "@/types/models";

const maxMessages = 40;

export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY) {
    return Response.json(
      { error: "Chat is unavailable until GROQ_API_KEY is configured." },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (
    typeof payload !== "object" ||
    payload === null ||
    !("messages" in payload) ||
    !Array.isArray(payload.messages)
  ) {
    return Response.json({ error: "A messages array is required." }, { status: 400 });
  }

  if (payload.messages.length === 0 || payload.messages.length > maxMessages) {
    return Response.json(
      { error: `Send between 1 and ${maxMessages} messages.` },
      { status: 400 },
    );
  }

  const validation = await safeValidateUIMessages<Message>({
    messages: payload.messages,
  });
  if (!validation.success) {
    return Response.json({ error: "One or more messages are invalid." }, { status: 400 });
  }

  const messages = validation.data;
  if (
    messages.some((message) => message.role === "system") ||
    messages.at(-1)?.role !== "user"
  ) {
    return Response.json({ error: "The conversation must end with a user message." }, {
      status: 400,
    });
  }

  const result = streamText({
    model: groq("openai/gpt-oss-120b"),
    system:
      "You are Verity's assistant. No document has been provided in this chat yet. Do not claim to have read or cite a document. If asked a document-specific question, explain that document upload and grounded answers are not available yet.",
    messages: await convertToModelMessages(messages),
    abortSignal: request.signal,
  });

  return result.toUIMessageStreamResponse();
}
