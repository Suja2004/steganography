import { useState } from "react";

export default function DecodeForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleDecode = async () => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://127.0.0.1:5000/decode", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessage(data.message || "❌ No hidden message found");
  };

  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">📖 Decode Message</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleDecode}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
      >
        Decode
      </button>
      {message && <p className="mt-3">🔎 Message: {message}</p>}
    </div>
  );
}
