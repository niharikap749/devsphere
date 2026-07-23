import { Sparkles, Code2, Bug, FileCode } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center text-zinc-400">
      <Sparkles className="mb-6 h-16 w-16 text-blue-500" />

      <h2 className="text-4xl font-bold text-white">
        Welcome to DevSphere AI
      </h2>

      <p className="mt-3 text-lg">
        Your AI-powered developer workspace
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-zinc-900 p-5">
          <Code2 className="mb-2 text-blue-400" />
          Generate Code
        </div>

        <div className="rounded-xl bg-zinc-900 p-5">
          <Bug className="mb-2 text-red-400" />
          Debug Applications
        </div>

        <div className="rounded-xl bg-zinc-900 p-5">
          <FileCode className="mb-2 text-green-400" />
          Generate README
        </div>

        <div className="rounded-xl bg-zinc-900 p-5">
          <Sparkles className="mb-2 text-yellow-400" />
          Explain Algorithms
        </div>
      </div>
    </div>
  );
}