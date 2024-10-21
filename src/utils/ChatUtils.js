import { Groq } from "groq-sdk";

const GROQ_API = import.meta.env.VITE_API_KEY_CHAT;
const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true,
});

export const getChat = async (content) => {
  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content }],
      model: "llama3-8b-8192",
      max_tokens: 150,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error creating chat completion:", error);
  }
};
