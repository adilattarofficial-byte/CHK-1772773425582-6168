"use client";

import { useEffect, useState } from "react";

type Message = {
id: number;
role: string;
text: string;
};

export default function HistoryPage() {

const [history, setHistory] = useState<Message[]>([]);

useEffect(() => {
const stored = localStorage.getItem("chatHistory");


if (stored) {
  setHistory(JSON.parse(stored));
}


}, []);

return ( <div className="p-8 h-full overflow-y-auto">


  <h2 className="text-xl font-semibold text-gray-800 mb-6">
    🕘 Chat History
  </h2>

  <div className="space-y-4 max-w-3xl">

    {history.length === 0 && (
      <p className="text-gray-500">No previous chats yet.</p>
    )}

    {history.map((msg) => (
      <div
        key={msg.id}
        className={`p-4 rounded-lg ${
          msg.role === "user"
            ? "bg-indigo-500 text-white ml-auto w-fit"
            : "bg-white border text-gray-800"
        }`}
      >
        {msg.text}
      </div>
    ))}

  </div>

</div>


);
}
