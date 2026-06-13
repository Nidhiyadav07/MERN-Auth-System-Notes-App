import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


const CreateTodo = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

 const handleSave = async () => {
  try {
    const res = await axios.post(
      "http://localhost:8000/note/create",
      {
        title,
        content: note,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (res.data.success) {
      toast.success("Note saved successfully");

      setTitle("");
      setNote("");

      navigate("/notes");
    }
  } 
   catch (error) {
  console.log(error);
  console.log(error.response);
  console.log(error.response?.data);

  toast.error(
    error.response?.data?.message || "Failed to save"
  );
}
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 border border-green-100">
        
        {/* Header */}
        <h1 className="text-2xl font-bold text-green-700 mb-1">
          Create Your Note 📝
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Capture your thoughts instantly and stay organized.
        </p>

        {/* Title */}
        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-200 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        {/* Note */}
        <textarea
          placeholder="Write your note here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={8}
          className="w-full border border-gray-200 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
        />

        {/* Actions */}
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-400">
            Auto-save coming soon 🚀
          </p>

          <Button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-500 px-6"
          >
            Save Note
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTodo;