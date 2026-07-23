const API_URL = "http://localhost:8000/api";

export async function sendMessage(prompt: string) {
  const response = await fetch(`${API_URL}/ai/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate response");
  }

  return response.json();
}