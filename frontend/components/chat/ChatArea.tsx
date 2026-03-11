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

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4 relative">

      {/* Empty State */}
      {messages.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">

          <div className="text-5xl mb-4">
            🎓
          </div>

          <h2 className="text-2xl font-semibold text-gray-500">
            Campus AI Assistant
          </h2>

          <p className="text-sm text-gray-400 mt-2">
            Ask about exams, syllabus, attendance policies, and more.
          </p>

        </div>
      )}

      {/* Chat Messages */}
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