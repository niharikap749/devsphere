import { useState } from "react";

import DashboardLayout from "../components/layout/DashboardLayout";
import ChatInput from "../components/ai/ChatInput";
import ChatWindow from "../components/ai/ChatWindow";
import EmptyState from "../components/ai/EmptyState";
import PromptSuggestions from "../components/ai/PromptSuggestions";
import TypingIndicator from "../components/ai/TypingIndicator";
import FileUpload from "../components/ai/FileUpload";

import { useConversation } from "../context/ConversationContext";
import { sendMessage } from "../services/ai.service";
import { uploadDocument } from "../services/document.service";

import type { Message } from "../types/chat";

export default function AIChat() {
  const { currentConversation, updateMessages } =
    useConversation();

  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const messages = currentConversation?.messages ?? [];

  async function handleFileUpload(file: File) {
    try {
      setSelectedFile(file);
  
      await uploadDocument(file);
  
      console.log("✅ Document uploaded");
    } catch (error: any) {
      console.error(error);
  
      alert(
        error.response?.data?.message ??
        "Document upload failed"
      );
    }
  }

  async function handleSend(prompt: string) {
    if (!prompt.trim() || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt,
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    updateMessages(updatedMessages);

    setLoading(true);

    try {
      const data = await sendMessage(updatedMessages);

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response,
      };

      updateMessages([
        ...updatedMessages,
        aiMessage,
      ]);
    } catch (error) {
      console.error(error);

      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "❌ Sorry, something went wrong while generating the response.",
      };

      updateMessages([
        ...updatedMessages,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="flex h-full flex-col bg-zinc-950">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8">

          <FileUpload
            onFileSelect={handleFileUpload}
          />

          {selectedFile && (
            <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/10 p-4">
              <p className="font-medium text-green-400">
                📄 {selectedFile.name}
              </p>

              <p className="mt-1 text-sm text-zinc-400">
                AI will now answer questions based on this document.
              </p>
            </div>
          )}

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