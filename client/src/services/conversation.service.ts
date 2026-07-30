import type { Conversation } from "../types/conversation";

const STORAGE_KEY = "devsphere-conversations";

export function getConversations(): Conversation[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function saveConversations(
  conversations: Conversation[]
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(conversations)
  );
}