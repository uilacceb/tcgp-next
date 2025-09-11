"use client";

import { useState } from "react";

// Define the type for a single chat message
interface Message {
  text: string;
  role: "user" | "bot";
}

export default function Chatbox() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, role: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: userMessage.text }),
      });

      const data = await res.json();
      if (res.ok) {
        const botMessage: Message = { text: data.text, role: "bot" };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(data.error || "Failed to get a response.");
      }
    } catch (error) {
      console.error("Frontend error:", error);
      const errorMessage: Message = {
        text: "Sorry, something went wrong. Please try again later.",
        role: "bot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message bot">Thinking...</div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about a Pokémon..."
          disabled={isLoading}
        />
        <button onClick={handleSend} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
}