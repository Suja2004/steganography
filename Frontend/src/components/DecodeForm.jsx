import { useState } from "react";

export default function DecodeForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDecode = async () => {
    if (!file) {
      setMessage("❌ Please upload an encoded image first.");
      return;
    }
    
    setLoading(true);
    setMessage("");
    
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://127.0.0.1:5000/decode", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setMessage(data.message || "❌ No hidden message found");
    } catch (error) {
      console.error("Error decoding:", error);
      setMessage("❌ Error occurred while decoding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="simulation group">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Decode Message
        </h2>
      </div>

      <div className="space-y-6">
        {/* File Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            📁 Select Encoded Image
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-3 bg-gray-700/50 border-2 border-gray-600/50 rounded-xl text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700 file:cursor-pointer hover:border-green-500/50 transition-all duration-300 cursor-pointer"
            />
            {file && (
              <div className="mt-2 text-sm text-green-400 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {file.name}
              </div>
            )}
          </div>
        </div>

        {/* Decode Button */}
        <button
          onClick={handleDecode}
          disabled={!file || loading}
          className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:shadow-none flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Decoding...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              <span>Decode Message</span>
            </>
          )}
        </button>

        {/* Results */}
        {message && (
          <div className={`p-4 rounded-xl border transition-all duration-300 ${
            message.includes('❌') 
              ? 'bg-red-900/20 border-red-700/50 text-red-400' 
              : 'bg-green-900/20 border-green-700/50 text-green-400'
          }`}>
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-medium">Decoded Message:</p>
                <p className="mt-1 text-sm opacity-90">{message}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
