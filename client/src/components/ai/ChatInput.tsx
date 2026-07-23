import { useState } from "react";
import { Send } from "lucide-react";

interface Props {
  onSend: (message: string) => void;
  loading: boolean;
}

export default function ChatInput({
  onSend,
  loading,
}: Props) {
  const [message, setMessage] = useState("");

  const send = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-zinc-700 bg-zinc-900 p-3">
      <input
        className="flex-1 bg-transparent outline-none text-white"
        placeholder="Ask DevSphere AI anything..."
        value={message}
        disabled={loading}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") send();
        }}
      />

      <button
        onClick={send}
        disabled={loading}
        className="rounded-full bg-blue-600 p-3 transition hover:bg-blue-700 disabled:opacity-50"
      >
        <Send size={18} />
      </button>
    </div>
  );
}