import { client } from "./openrouter";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function generateResponse(
  messages: ChatMessage[],
  systemInstruction?: string
) {
  const completion = await client.chat.completions.create({
    model:
      process.env.OPENROUTER_MODEL ||
      "deepseek/deepseek-chat-v3.1:free",

    messages: [
      ...(systemInstruction
        ? [
            {
              role: "system" as const,
              content: systemInstruction,
            },
          ]
        : []),

      ...messages,
    ],
  });

  return completion.choices[0].message.content ?? "";
}