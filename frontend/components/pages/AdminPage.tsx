"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {

  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  // 🔐 Check if admin is logged in
  useEffect(() => {

    const token = localStorage.getItem("adminToken");

    if (!token) {
      window.location.href = "/admin-login";
    }

  }, []);

  const uploadFile = async () => {

    if (!file) return;

    const token = localStorage.getItem("adminToken");

    const formData = new FormData();
    formData.append("file", file);

    try {

      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (res.status === 401) {

        // token invalid or expired
        localStorage.removeItem("adminToken");
        window.location.href = "/admin-login";
        return;

      }

      const data = await res.json();

      setMessage("✅ Upload successful: " + data.filename);
      setFile(null);

    } catch (error) {

      setMessage("❌ Upload failed");

    }

  };

  return (

  <div className="p-10">

    <h1 className="text-2xl font-semibold mb-6 text-gray-800">
      ⚙️ Admin Panel
    </h1>

    <div className="bg-white p-6 rounded-xl shadow w-[420px] space-y-5">

      <h2 className="font-medium text-gray-700">
        Upload College Document
      </h2>

      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-indigo-500 transition">

        <span className="text-gray-600 mb-2">
          📄 Click to choose a PDF file
        </span>

        <span className="text-sm text-gray-400">
          {file ? file.name : "No file selected"}
        </span>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
        />

      </label>

      <button
        onClick={uploadFile}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg w-full"
      >
        Upload PDF
      </button>

      {message && (
        <p className="text-sm text-gray-600">
          {message}
        </p>
      )}

      {/* Logout Button */}

      <button
        onClick={()=>{
          localStorage.removeItem("adminToken");
          window.location.href="/admin-login";
        }}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg w-full"
      >
        Logout
      </button>

    </div>

  </div>

  );
}