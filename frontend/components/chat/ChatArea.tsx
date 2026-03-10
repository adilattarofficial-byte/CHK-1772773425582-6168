"use client";

type Message = {
id: number;
role: string;
text: string;
};

type ChatAreaProps = {
messages: Message[];
};

export default function ChatArea({ messages }: ChatAreaProps) {

return ( <div className="flex-1 overflow-y-auto p-6 space-y-4">


  {messages.map((msg) => (
    <div
      key={msg.id}
      className={`max-w-xl p-4 rounded-xl ${
        msg.role === "user"
          ? "bg-indigo-500 text-white ml-auto"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      {msg.text}
    </div>
  ))}

</div>


);
}
