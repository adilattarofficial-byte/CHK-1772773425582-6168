
"use client";

import { useState } from "react";

export default function ChatArea() {

  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I'm CampusAI. Ask me about exams, syllabus, or attendance." }
  ]);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">

      {messages.map((msg, index) => (

        <div
          key={index}
          className={`max-w-lg p-4 rounded-xl shadow
          ${msg.role === "user"
            ? "bg-indigo-600 text-white ml-auto"
            : "bg-white text-gray-800"}`}
        >
          {msg.text}
        </div>

      ))}

    </div>
  );
}

