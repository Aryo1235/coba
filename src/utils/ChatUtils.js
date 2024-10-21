export const getChat = async (content) => {
  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content }],
      model: "llama3-8b-8192",
      max_tokens: 150,
    });
    console.log("API Response:", response);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error creating chat completion:", error);
    return "Error: Failed to get response from AI.";
  }
};
