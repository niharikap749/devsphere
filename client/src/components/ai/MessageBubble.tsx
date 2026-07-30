import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Props {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({ role, content }: Props) {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div
      className={`flex gap-4 mb-8 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
          <Bot size={20} />
        </div>
      )}

      <div
        className={`max-w-4xl rounded-2xl p-5 shadow-lg ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-zinc-900 border border-zinc-800 text-zinc-100"
        }`}
      >
           <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  components={{
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const code = String(children).replace(/\n$/, "");

      if (match) {
        return (
          <div className="overflow-hidden rounded-xl">
            <div className="flex items-center justify-between bg-zinc-800 px-4 py-2 text-sm">
              <span>{match[1]}</span>

              <button
                onClick={() => copyText(code)}
                className="flex items-center gap-2 hover:text-blue-400"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
            >
              {code}
            </SyntaxHighlighter>
          </div>
        );
      }

      return (
        <code
          className="rounded bg-zinc-800 px-1 py-0.5"
          {...props}
        >
          {children}
        </code>
      );
    },
  }}
>
  {content}
</ReactMarkdown>
      </div>

      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
          <User size={20} />
        </div>
      )}
    </div>
  );
}