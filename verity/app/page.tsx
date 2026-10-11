import Chat from "./chat";
import DocumentPanel from "./document-panel";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center gap-8 bg-zinc-50 px-4 py-10 font-sans dark:bg-black sm:px-8">
      <header className="w-full max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
          Verity
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Document chat</h1>
      </header>
      <div className="grid w-full max-w-6xl flex-1 gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <DocumentPanel />
        <Chat />
      </div>
    </main>
  );
}
