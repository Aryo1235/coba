import { Groq } from "groq-sdk";

const GROQ_API = import.meta.env.VITE_API_KEY_CHAT;
const groq = new Groq({
  apiKey: GROQ_API,
});

export const getChat = async (content) => {
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: content,
      },
    ],
    model: "llama3-8b-8192",
    max_tokens: 150,
  });
  console.log(response);
  return response.choices[0].message.content;
};
