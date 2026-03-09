
"use client";

import { MessageSquare, FileText, Clock, Settings, GraduationCap } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-72 bg-white border-r h-screen flex flex-col">

      {/* Logo */}
      <div className="flex items-center gap-3 p-5 border-b">
        <div className="bg-blue-600 text-white p-2 rounded-lg">
          <GraduationCap size={20} />
        </div>

        <h1 className="font-semibold text-lg text-gray-800">
          CampusAI
        </h1>
      </div>

      {/* Navigation */}
      <div className="p-4 space-y-2">

        <button className="flex items-center gap-3 w-full p-3 rounded-lg bg-indigo-100 text-indigo-700 font-medium">
          <MessageSquare size={18}/> Chat
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100">
          <FileText size={18}/> Documents
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100">
          <Clock size={18}/> History
        </button>

        <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-700 hover:bg-gray-100">
          <Settings size={18}/> Admin
        </button>

      </div>

    </div>
  );
}

