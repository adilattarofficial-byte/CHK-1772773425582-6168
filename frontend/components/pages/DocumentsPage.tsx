"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

export default function DocumentsPage() {

const [documents, setDocuments] = useState<string[]>([]);

useEffect(() => {
fetch("http://127.0.0.1:8000/documents")
.then(res => res.json())
.then(data => setDocuments(data.documents));
}, []);

return ( <div className="p-8 bg-gray-100 h-full">


  <h2 className="text-xl font-semibold text-gray-800 mb-6">
    College Documents
  </h2>

  <div className="space-y-4">

    {documents.map((doc, index) => (
      <div
        key={index}
        className="flex items-center gap-3 p-4 bg-white rounded-lg border shadow hover:bg-gray-50"
      >
        <FileText size={20} className="text-indigo-600" />

        <span className="text-gray-800 font-medium">
          {doc}
        </span>
      </div>
    ))}

  </div>

</div>


);
}
