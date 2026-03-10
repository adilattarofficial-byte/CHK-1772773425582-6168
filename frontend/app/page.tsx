"use client";

import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ChatArea from "../components/chat/ChatArea";
import ChatInput from "../components/chat/ChatInput";
import DocumentsPage from "../components/pages/DocumentsPage";
import HistoryPage from "../components/pages/HistoryPage";
import AdminPage from "../components/pages/AdminPage";

type Message = {
  id: number;
  role: string;
  text: string;
};

export default function Home() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState<string>("chat");

  const addMessage = (msg: { role: string; text: string }) => {


    // create guaranteed unique id
    const id = Date.now() + Math.random();

    const newMessage = { ...msg, id };

    setMessages((prev) => {

      const updated = [...prev, newMessage];

      // store history
      localStorage.setItem("chatHistory", JSON.stringify(updated));

      return updated;
    });

    return id;


  };

  return (<div className="flex h-screen bg-gray-100">


    <Sidebar setPage={setPage} activePage={page} />

    <div className="flex flex-col flex-1">

      <Header />

      {page === "chat" && (
        <>
          <ChatArea messages={messages} />
          <ChatInput addMessage={addMessage} />
        </>
      )}

      {page === "documents" && (
        <DocumentsPage />
      )}

      {page === "history" && (
        <HistoryPage />
      )}

      {page === "admin" && (
        <AdminPage />
      )}

    </div>

  </div>


  );
}
