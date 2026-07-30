import api from "./api.service";
import type { Message } from "../types/chat";

export async function sendMessage(messages: Message[]) {
  const payload = messages.map(({ role, content }) => ({
    role,
    content,
  }));

  const response = await api.post("/ai/chat", {
    messages: payload,
  });

  return response.data;
}