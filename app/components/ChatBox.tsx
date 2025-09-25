"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSearch } from "../context/SearchContext";
import { useRouter } from "next/navigation";

// Define the type for a single chat message
interface Message {
  text: string;
  role: "user" | "bot";
}

export default function Chatbox() {
  const { setUserInput } = useSearch();
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height to recalculate
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

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
    <div>
      <h1 className="p-4 text-[#86A695] font-bold lg:text-xl dark:text-white">
        Feeling unsure about a Pokémon&#39;s name? No problem! Just describe its
        color, type, shape, or species, and the chat will use your description
        to find it.
      </h1>
      <div className="flex flex-col items-center min-h-[50vh] md:min-h-[72vh] p-4">
        <div className="bg-white flex-grow w-full rounded-2xl p-6">
          {messages.map((msg, index) => (
            <div key={index} className="flex-col flex">
              {msg.role === "bot" ? (
                <p className="bg-gray-200 text-[#86A695] dark:text-[#0d2f3f] font-bold p-3 rounded-xl self-start max-w-[80%] mb-2">
                  {msg.text?.split(" ").map((r) => (
                    <button
                      className="cursor-pointer"
                      key={r}
                      onClick={() => {
                        // setUserInput(r.toLowerCase());
                        router.push(`/cards?name=${r.toLowerCase()}`);
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </p>
              ) : (
                <p className="bg-[#86A695] text-white font-bold p-3 rounded-xl self-end max-w-[80%] mb-2 dark:bg-[#0d2f3f]">
                  {msg.text}
                </p>
              )}
            </div>
          ))}
          {isLoading && (
            <p className="bg-gray-200 text-[#86A695] dark:text-[#0d2f3f] font-bold p-3 rounded-xl self-start max-w-[80%] mb-2">
              Thinking...
            </p>
          )}
        </div>
        <div className="shadow-[0px_0px_15px_#fff] dark:shadow-[0px_0px_10px_#d3d9db]  rounded-2xl p-2 w-full mt-8 bg-[#A3AFA9] dark:bg-[#0d2f3f] ">
          <div className="flex justify-between py-2 ">
            <textarea
              value={input}
              ref={textareaRef}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about a Pokémon..."
              disabled={isLoading}
              className="p-2 text-wrap w-[80%] rounded-2xl overflow-hidden focus:outline-0 font-bold text-white"
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-white dark:bg-[#0d2f3f] rounded-xl md:text-xl w-[100px] font-bold cursor-pointer dark:shadow-[0px_0px_10px_#d3d9db] mr-2 text-[#97ACA1]"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
