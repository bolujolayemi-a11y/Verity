"use client";

import { useState, type FormEvent } from "react";
import { uploadDocument } from "./actions/upload-document";

export default function DocumentPanel() {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [uploadMessage, setUploadMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploadStatus("uploading");
    setUploadMessage("");

    const formData = new FormData(event.currentTarget);
    const result = await uploadDocument(formData);

    if (result.error) {
      setUploadStatus("error");
      setUploadMessage(result.error);
    } else {
      setUploadStatus("success");
      setUploadMessage(result.message || "Document uploaded successfully.");
    }
  }

  return (
    <aside
      aria-labelledby="document-panel-title"
      className="flex min-h-80 flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950 lg:min-h-0"
    >
      <header className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
        <h2 id="document-panel-title" className="font-semibold">
          Document
        </h2>
      </header>
      <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
        <svg
          aria-hidden="true"
          className="mb-4 size-14 rounded-xl bg-zinc-100 p-3 text-zinc-500 dark:bg-zinc-900"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M7 3.75h6.5L19 9.25v10A1.75 1.75 0 0 1 17.25 21h-10A1.75 1.75 0 0 1 5.5 19.25v-13A2.5 2.5 0 0 1 8 3.75Z" />
          <path d="M13 4v5.5h5.5M8.5 14h7M8.5 17h7" />
        </svg>
        <h3 className="font-medium">No document selected</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          Uploaded documents and cited passages will appear here.
        </p>

        <form className="mt-6 w-full max-w-xs" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="file-input">
            Upload document
          </label>
          <input
            className="block w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 file:mr-4 file:rounded-md file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-zinc-700 hover:file:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:file:bg-zinc-800 dark:file:text-zinc-300"
            disabled={uploadStatus === "uploading"}
            id="file-input"
            name="file"
            type="file"
            accept=".pdf,.txt,.md"
          />
          <button
            className="mt-3 w-full rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={uploadStatus === "uploading"}
            type="submit"
          >
            {uploadStatus === "uploading" ? "Uploading…" : "Upload"}
          </button>
        </form>

        {uploadMessage && (
          <p
            className={`mt-3 text-sm ${
              uploadStatus === "error" ? "text-red-600 dark:text-red-400" : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {uploadMessage}
          </p>
        )}
      </div>
    </aside>
  );
}
