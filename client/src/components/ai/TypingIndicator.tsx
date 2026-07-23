import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="mt-6 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
        <Bot size={20} />
      </div>

      <div className="rounded-2xl bg-zinc-900 px-5 py-4">
        <div className="flex gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-white" />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-white"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="h-2 w-2 animate-bounce rounded-full bg-white"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}