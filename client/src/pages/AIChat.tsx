import { useState } from "react";

import ChatWindow from "../components/ai/ChatWindow";
import ChatInput from "../components/ai/ChatInput";
import TypingIndicator from "../components/ai/TypingIndicator";
import EmptyState from "../components/ai/EmptyState";

import AppLayout from "../components/layout/AppLayout";
import PromptSuggestions from "../components/ai/PromptSuggestions";

import { sendMessage } from "../services/ai";
import type { Message } from "../types/chat";

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSend(prompt: string) {
    if (!prompt.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const data = await sendMessage(prompt);

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "❌ Sorry, something went wrong while generating the response.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>
      <div className="flex h-full flex-col bg-zinc-950">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {messages.length === 0 ? (
            <div className="space-y-8">
            <EmptyState />
          
            <PromptSuggestions
              onSelect={handleSend}
            />
          </div>
          ) : (
            <ChatWindow messages={messages} />
          )}

          {loading && <TypingIndicator />}
        </div>

        {/* Input */}
        <div className="border-t border-zinc-800 bg-zinc-950 p-6">
          <ChatInput
            onSend={handleSend}
            loading={loading}
          />
        </div>
      </div>
    </AppLayout>
  );
}