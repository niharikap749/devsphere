import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import ChatInput from "../components/ai/ChatInput";
import ChatWindow from "../components/ai/ChatWindow";
import EmptyState from "../components/ai/EmptyState";
import PromptSuggestions from "../components/ai/PromptSuggestions";
import TypingIndicator from "../components/ai/TypingIndicator";

import { useConversation } from "../context/ConversationContext";
import { sendMessage } from "../services/ai.service";

import type { Message } from "../types/chat";

export default function AIChat() {
  const { currentConversation, updateMessages } = useConversation();

  const [loading, setLoading] = useState(false);

  const messages = currentConversation?.messages ?? [];

  async function handleSend(prompt: string) {
    if (!prompt.trim() || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt,
    };

    // Add user message immediately
    const updatedMessages = [...messages, userMessage];
    updateMessages(updatedMessages);

    setLoading(true);

    try {
      // Send complete conversation history
      const data = await sendMessage(updatedMessages);

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response,
      };

      // Save AI response
      updateMessages([...updatedMessages, aiMessage]);
    } catch (error) {
      console.error(error);

      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "❌ Sorry, something went wrong while generating the response.",
      };

      updateMessages([...updatedMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
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
    </DashboardLayout>
  );
}