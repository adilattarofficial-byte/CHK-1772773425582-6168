
"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput() {

  const [question, setQuestion] = useState("");

  const sendMessage = async () => {

    if (!question) return;

    const response = await fetch("http://127.0.0.1:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        question: question
      })
    });

    const data = await response.json();

    console.log("AI:", data.answer);

    setQuestion("");
  };

  return (
    <div className="p-4 border-t bg-white">

      <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-3">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about exams, syllabus..."
          className="flex-1 bg-transparent outline-none text-gray-700"
        />

        <button
          onClick={sendMessage}
          className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg"
        >
          <Send size={16}/>
        </button>

      </div>

    </div>
  );
}

