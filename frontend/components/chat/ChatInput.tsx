"use client";

import { useState } from "react";
import { Send } from "lucide-react";

type ChatInputProps = {
addMessage: (message: any) => number;
};

export default function ChatInput({ addMessage }: ChatInputProps) {

const [question, setQuestion] = useState("");
const [loading, setLoading] = useState(false);

const sendMessage = async () => {


if (!question.trim() || loading) return;

const userQuestion = question;

// Show user message
addMessage({
  role: "user",
  text: userQuestion
});

// Show typing indicator
const typingId = addMessage({
  role: "ai",
  text: "AI is thinking..."
});

setQuestion("");
setLoading(true);

try {

  const response = await fetch("http://127.0.0.1:8000/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question: userQuestion
    })
  });

  const data = await response.json();

  // Replace typing message with actual answer
  addMessage({
    role: "ai",
    text: data.answer,
    replace: typingId
  });

} catch {

  addMessage({
    role: "ai",
    text: "⚠️ Error connecting to backend.",
    replace: typingId
  });

} finally {
  setLoading(false);
}


};

return ( <div className="p-4 border-t bg-white">


  <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-3">

    <input
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      placeholder="Ask about exams, syllabus..."
      className="flex-1 bg-transparent outline-none text-gray-700"
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      }}
    />

    <button
      onClick={sendMessage}
      disabled={loading}
      className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg disabled:opacity-50"
    >
      <Send size={16}/>
    </button>

  </div>

</div>


);
}
