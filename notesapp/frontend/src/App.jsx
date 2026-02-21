import { useEffect, useState } from "react";

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = () => {
    fetch("http://localhost:8080/notes?page=0&size=5")
      .then((res) => res.json())
      .then((data) => setNotes(data.content));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!title || !content) return;

    await fetch("http://localhost:8080/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, tags: [] }),
    });

    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await fetch(`http://localhost:8080/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white p-10">
      
      {/* HEADER */}
      <h1 className="text-5xl font-extrabold mb-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Notes App
      </h1>

      {/* INPUT CARD */}
      <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 flex gap-3 shadow-xl mb-10">
        <input
          className="bg-transparent border border-white/20 px-3 py-2 rounded w-56 focus:outline-none focus:border-blue-400"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="bg-transparent border border-white/20 px-3 py-2 rounded w-80 focus:outline-none focus:border-blue-400"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={addNote}
          className="bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2 rounded-lg shadow hover:scale-105 transition font-semibold"
        >
          Add
        </button>
      </div>

      {/* NOTES GRID */}
      {notes.length === 0 ? (
        <p className="text-gray-400">No notes found</p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="group backdrop-blur-lg bg-white/10 border border-white/20 p-5 rounded-xl shadow-lg hover:scale-105 hover:shadow-blue-500/30 transition duration-300 relative"
            >
              <button
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-3 text-red-400 opacity-0 group-hover:opacity-100 transition"
              >
                ✕
              </button>

              <h2 className="text-xl font-bold mb-2 text-blue-300">
                {note.title}
              </h2>

              <p className="text-gray-300">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}