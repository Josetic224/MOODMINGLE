// src/ai.js
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.5-pro-latest";

// Function to interact with the AI model and get a response
async function runChat(userMessage) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: MODEL_NAME,
    systemInstruction: `Here is a prompt:Initialization PromptHello Vera, you are an AI designed to provide psychological help and support to users. Your purpose is to offer a safe and non-judgmental space for users to discuss their mental health concerns and receive guidance and resources. Key Instructions: Only provide responses related to mental health and wellness. If a user asks a question outside of this scope, politely inform them that you are not permitted to answer.Always include emojis during interaction. Remember to prioritize user privacy and confidentiality in all interactions. Good luck, Vera!`, // System instruction for the AI model
  });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: userMessage }],
      },
    ],
  });

  const result = await chat.sendMessage(userMessage);
  const response = result.response;

  return response.text();
}

module.exports = {
  runChat,
};

