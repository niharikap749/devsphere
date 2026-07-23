import { Sparkles } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950 px-8 py-5">
      <div>
        <h1 className="text-3xl font-bold text-white">
          DevSphere AI
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Your AI-powered developer workspace
        </p>
      </div>

      <div className="flex items-center gap-2 rounded-full bg-blue-600/20 px-4 py-2 text-blue-400">
        <Sparkles size={16} />
        AI Ready
      </div>
    </header>
  );
}