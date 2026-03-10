"use client";

import { MessageSquare, FileText, Clock, Settings, GraduationCap } from "lucide-react";

type SidebarProps = {
setPage: React.Dispatch<React.SetStateAction<string>>;
activePage: string;
};

export default function Sidebar({ setPage, activePage }: SidebarProps) {

const itemClass = (name: string) =>
`flex items-center gap-3 w-full p-3 rounded-lg ${
      activePage === name
        ? "bg-indigo-100 text-indigo-700 font-medium"
        : "text-gray-700 hover:bg-gray-100"
    }`;

return ( <div className="w-72 bg-white border-r h-screen flex flex-col">


  <div className="flex items-center gap-3 p-5 border-b">
    <div className="bg-blue-600 text-white p-2 rounded-lg">
      <GraduationCap size={20} />
    </div>
    <h1 className="font-semibold text-lg text-gray-800">
      CampusAI
    </h1>
  </div>

  <div className="p-4 space-y-2">

    <button onClick={() => setPage("chat")} className={itemClass("chat")}>
      <MessageSquare size={18}/> Chat
    </button>

    <button onClick={() => setPage("documents")} className={itemClass("documents")}>
      <FileText size={18}/> Documents
    </button>

    <button onClick={() => setPage("history")} className={itemClass("history")}>
      <Clock size={18}/> History
    </button>

    <button onClick={() => setPage("admin")} className={itemClass("admin")}>
      <Settings size={18}/> Admin
    </button>

  </div>

</div>


);
}
