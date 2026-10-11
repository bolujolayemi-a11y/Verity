export default function DocumentPanel() {
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
          Uploaded documents and cited passages will appear here. Document upload
          and processing are not available yet.
        </p>
      </div>
    </aside>
  );
}
