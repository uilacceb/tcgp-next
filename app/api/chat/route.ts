import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Define the shape of the request body
interface ChatRequest {
  userInput: string;
}

// Ensure the API key exists
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const { userInput }: ChatRequest = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a helpful assistant for a TCG Pocket database. Your ONLY purpose is to answer questions about Pokémon. You must not answer questions about any other topic. The User will describe a pokemon and you have to show all the results that matches the pokemon that user describes. Just shows the list of pokemon names that matches users' description.



If the user's question is about Pokémon, provide a helpful and accurate answer. If the question is not related to Pokémon in any way, you must respond with the exact phrase: "Sorry, I cannot help with questions other than Pokémon."
    
    User: ${userInput}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Error from Gemini API:", error);
    return NextResponse.json(
      { error: "Failed to get a response from the model." },
      { status: 500 }
    );
  }
}
