import { client } from "./openrouter";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function generateResponse(
  messages: ChatMessage[],
  document?: string
) {
  let systemPrompt =
    "You are DevSphere AI, a helpful AI developer assistant.";

  if (document && document.trim().length > 0) {
    systemPrompt += `

The user has uploaded a document.

Use ONLY this document to answer document-related questions.

If the answer cannot be found in the document, clearly say:

"I couldn't find that information in the uploaded document."

Uploaded Document:

${document}`;
  }

  const completion =
    await client.chat.completions.create({
      model:
        process.env.OPENROUTER_MODEL ||
        "deepseek/deepseek-chat-v3.1:free",

      messages: [
        {
          role: "system",
          content: systemPrompt,
        },

        ...messages,
      ],
    });

  return (
    completion.choices[0].message.content ??
    ""
  );
}