import { useEffect, useState } from "react";
import {
  getConversations,
  saveConversations,
} from "../services/conversation.service";
import type { Conversation } from "../types/conversation";

export default function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>(
    getConversations()
  );

  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  return {
    conversations,
    setConversations,
  };
}