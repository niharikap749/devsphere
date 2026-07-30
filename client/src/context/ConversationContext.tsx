import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Message } from "../types/chat";
import type { Conversation } from "../types/conversation";
import { createNewConversation } from "../utils/conversation";

interface ConversationContextType {
  conversations: Conversation[];
  currentConversation: Conversation | null;

  createConversation: () => void;
  selectConversation: (id: string) => void;
  deleteConversation: (id: string) => void;
  renameConversation: (id: string, title: string) => void;
  updateMessages: (messages: Message[]) => void;
}

const ConversationContext =
  createContext<ConversationContextType | undefined>(undefined);

const STORAGE_KEY = "devsphere-conversations";

interface Props {
  children: ReactNode;
}

export function ConversationProvider({ children }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);

  // Load conversations
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      const firstConversation = createNewConversation();

      setConversations([firstConversation]);
      setCurrentConversation(firstConversation);
      return;
    }

    const parsed: Conversation[] = JSON.parse(stored);

    if (parsed.length === 0) {
      const firstConversation = createNewConversation();

      setConversations([firstConversation]);
      setCurrentConversation(firstConversation);
    } else {
      setConversations(parsed);
      setCurrentConversation(parsed[0]);
    }
  }, []);

  // Save conversations
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(conversations)
    );
  }, [conversations]);

  function createConversation() {
    const conversation = createNewConversation();

    setConversations((prev) => [conversation, ...prev]);
    setCurrentConversation(conversation);
  }

  function selectConversation(id: string) {
    const conversation = conversations.find(
      (conversation) => conversation.id === id
    );

    if (conversation) {
      setCurrentConversation(conversation);
    }
  }

  function deleteConversation(id: string) {
    const filtered = conversations.filter(
      (conversation) => conversation.id !== id
    );

    if (filtered.length === 0) {
      const newConversation = createNewConversation();

      setConversations([newConversation]);
      setCurrentConversation(newConversation);
      return;
    }

    setConversations(filtered);

    if (currentConversation?.id === id) {
      setCurrentConversation(filtered[0]);
    }
  }

  function renameConversation(id: string, title: string) {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === id
          ? {
              ...conversation,
              title: trimmedTitle,
            }
          : conversation
      )
    );

    if (currentConversation?.id === id) {
      setCurrentConversation({
        ...currentConversation,
        title: trimmedTitle,
      });
    }
  }

  function updateMessages(messages: Message[]) {
    if (!currentConversation) return;

    const updatedConversation: Conversation = {
      ...currentConversation,
      messages,
      updatedAt: new Date().toISOString(),
      title:
        currentConversation.title === "New Chat" &&
        messages.length > 0
          ? messages[0].content.substring(0, 30)
          : currentConversation.title,
    };

    setCurrentConversation(updatedConversation);

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === updatedConversation.id
          ? updatedConversation
          : conversation
      )
    );
  }

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        currentConversation,
        createConversation,
        selectConversation,
        deleteConversation,
        renameConversation,
        updateMessages,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  const context = useContext(ConversationContext);

  if (!context) {
    throw new Error(
      "useConversation must be used within ConversationProvider"
    );
  }

  return context;
}