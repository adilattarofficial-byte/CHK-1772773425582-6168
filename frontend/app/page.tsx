import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import ChatArea from "@/components/chat/ChatArea";
import ChatInput from "@/components/chat/ChatInput";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar />

      <div className="flex flex-col flex-1">

        <Header />

        <ChatArea />

        <ChatInput />

      </div>

    </div>
  );
}