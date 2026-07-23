import { client } from "./openrouter";

export async function generateResponse(
  prompt: string,
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

      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.choices[0].message.content ?? "";
}