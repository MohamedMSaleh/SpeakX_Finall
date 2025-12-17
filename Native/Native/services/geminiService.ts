import { GoogleGenAI, Chat } from "@google/genai";

let client: GoogleGenAI | null = null;
let chatSession: Chat | null = null;

export const initializeGemini = () => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing");
    return;
  }
  
  client = new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const startChat = async () => {
  if (!client) initializeGemini();
  if (!client) throw new Error("Gemini client not initialized");
  
  chatSession = client.chats.create({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: "You are SpeakX, a friendly, encouraging, and world-class English language tutor. Your goal is to help users practice their English fluency, pronunciation, and grammar. Keep responses concise, conversational, and helpful. When correcting the user, be gentle and explain 'why'. If the user makes a mistake, provide a corrected version in a distinct format."
    }
  });
  return chatSession;
};

export const sendMessage = async (message: string): Promise<string> => {
  if (!chatSession) await startChat();
  if (!chatSession) throw new Error("Chat session could not be started");

  try {
    const result = await chatSession.sendMessage({ message });
    return result.text || "I didn't catch that.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I'm having trouble connecting right now. Please try again.";
  }
};

export const analyzePronunciation = async (text: string, originalPrompt: string): Promise<string> => {
    if (!client) initializeGemini();
    if(!client) return "Error initializing AI";

    const prompt = `
      The user was asked to say: "${originalPrompt}".
      The user actually said (transcribed): "${text}".
      
      Analyze the differences. Return a valid JSON object with the following structure:
      {
        "score": number (0-100),
        "feedback": "string (brief feedback)",
        "corrections": [
           { "word": "string", "issue": "string" }
        ]
      }
      Do not include markdown code blocks. Just the raw JSON string.
    `;

    try {
      const result = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });
      return result.text || "{}";
    } catch (e) {
      console.error(e);
      return "{}";
    }
}