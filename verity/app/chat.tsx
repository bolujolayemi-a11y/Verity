"use client";

import { useState, type SubmitEvent } from "react";
import { useChat } from "@ai-sdk/react";
import type { Message } from "@/types/models";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop, regenerate } = useChat<Message>();
  const isBusy = status === "submitted" || status === "streaming";

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || isBusy) return;

    void sendMessage({ text });
    setInput("");
  }

  return (
    <section className="flex w-full max-w-3xl flex-1 flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div
        aria-live="polite"
        aria-relevant="additions text"
        className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-8"
      >
        {messages.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center text-center">
            <h2 className="text-xl font-semibold">Ask Verity a question</h2>
            <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
              Chat is connected to Groq.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <article key={message.id} className="space-y-2">
              <h2 className="text-sm font-semibold capitalize text-zinc-500">
                {message.role}
              </h2>
              <div className="space-y-2 whitespace-pre-wrap wrap-break-word leading-7">
                {message.parts.map((part, index) =>
                  part.type === "text" ? (
                    <p key={`${message.id}-${index}`}>{part.text}</p>
                  ) : null,
                )}
              </div>
            </article>
          ))
        )}
        {status === "submitted" && (
          <p role="status" className="text-sm text-zinc-500">
            Verity is thinking…
          </p>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="mx-5 mb-4 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-900 sm:mx-8 dark:border-red-900 dark:bg-red-950 dark:text-red-100"
        >
          <p>Verity couldn’t complete that response. Check your connection and try again.</p>
          <button
            className="mt-2 font-semibold underline underline-offset-2"
            onClick={() => void regenerate()}
            type="button"
          >
            Retry
          </button>
        </div>
      )}

      <form
        className="flex gap-3 border-t border-zinc-200 p-4 sm:p-6 dark:border-zinc-800"
        onSubmit={handleSubmit}
      >
        <label className="sr-only" htmlFor="chat-input">
          Your message
        </label>
        <textarea
          className="min-h-12 flex-1 resize-y rounded-lg border border-zinc-300 bg-transparent px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-zinc-700"
          id="chat-input"
          onChange={(event) => setInput(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          placeholder="Write a message…"
          value={input}
        />
        {isBusy ? (
          <button
            className="self-end rounded-lg border border-zinc-300 px-4 py-3 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
            onClick={stop}
            type="button"
          >
            Stop
          </button>
        ) : (
          <button
            className="self-end rounded-lg bg-blue-700 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!input.trim()}
            type="submit"
          >
            Send
          </button>
        )}
      </form>
    </section>
  );
}
