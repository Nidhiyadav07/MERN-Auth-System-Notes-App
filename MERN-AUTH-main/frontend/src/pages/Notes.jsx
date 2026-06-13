import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/note/all",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setNotes(res.data.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.data.success) {
        toast.success("Note deleted");

        setNotes(notes.filter((note) => note._id !== id));
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <Navbar notes={notes} />

      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">
          My Notes
        </h1>

        {notes.length === 0 ? (
          <p>No notes found</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {notes.map((note) => (
              <div
                key={note._id}
                className="border rounded-xl p-5 shadow"
              >
                <h2 className="font-bold text-lg">
                  {note.title}
                </h2>

                <p className="mt-3 text-gray-600">
                  {note.content}
                </p>

                <button
                  onClick={() => deleteNote(note._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;