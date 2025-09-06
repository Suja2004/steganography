import { useState, useEffect } from "react";

export default function EncodeForm() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [encodedUrl, setEncodedUrl] = useState(null);
  const [plots, setPlots] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPlotModal, setShowPlotModal] = useState(false);
  const [currentPlotKey, setCurrentPlotKey] = useState(null); // ✅ track active plot
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let interval;
    if (loading) {
      setProgress(0);
      setVisible(false);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + 5;
          return prev;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleEncode = async (e) => {
    e.preventDefault();
    if (!file || !message) return;

    setLoading(true);
    setEncodedUrl(null);
    setPlots(null);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("message", message);

    try {
      const res = await fetch("http://127.0.0.1:5000/encode", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();

        setEncodedUrl(`http://127.0.0.1:5000${data.encoded_image}`);

        setPlots({
          original: `http://127.0.0.1:5000${data.original_lsb}`,
          encoded: `http://127.0.0.1:5000${data.encoded_lsb}`,
          changes: `http://127.0.0.1:5000${data.changes_lsb}`,
        });

        setProgress(100);
        setTimeout(() => setVisible(true), 500);
      } else {
        console.error("Encoding failed");
      }
    } catch (error) {
      console.error("Error encoding:", error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const handleDownload = async () => {
    if (!encodedUrl) return;
    try {
      const response = await fetch(encodedUrl);
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      const urlParts = encodedUrl.split("/");
      const filename = urlParts[urlParts.length - 1] || "encoded_image.png";
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
      console.error("Download failed:", error);
      try {
        window.open(encodedUrl, "_blank");
      } catch {
        alert("Download failed. Please right-click the image and save manually.");
      }
    }
  };

  const plotKeys = Object.keys(plots || {});

  return (
    <div className="simulation group">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Encode Message
        </h2>
      </div>

      <form onSubmit={handleEncode} className="space-y-6">
        {/* File Upload Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            📁 Select Cover Image
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-3 bg-gray-700/50 border-2 border-gray-600/50 rounded-xl text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
              required
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

        {/* Message Input Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            💬 Secret Message
          </label>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Enter your secret message here..."
                value={message}
                onChange={(e) => {
                  const filtered = e.target.value.replace(
                    /[^\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]/g,
                    ""
                  );
                  setMessage(filtered);
                }}
                className="w-full p-3 bg-gray-700/50 border-2 border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:border-blue-500/70 focus:bg-gray-700/70 transition-all duration-300"
                required
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                {message.length}/100
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !file || !message}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 shadow-lg disabled:shadow-none flex items-center space-x-2 min-w-fit"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Encoding...</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Encode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Progress Bar */}
      {loading && (
        <div className="mt-6 p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Encoding in progress...</span>
            <span className="text-sm font-bold text-blue-400">{progress}%</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-300 shadow-sm"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className={`transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}>
        {encodedUrl && (
          <div className="mt-6 p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-700/50 rounded-2xl">
            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Encoded Image Ready
            </h3>
            <div className="flex flex-col items-center">
              <div className="relative group">
                <img
                  src={encodedUrl}
                  alt="Encoded"
                  className="rounded mt-2 border min-w-30 max-w-50"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-xl transition-all duration-300"></div>
              </div>
              <button
                onClick={handleDownload}
                className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download Image</span>
              </button>
            </div>
          </div>
        )}

        {plots && (
          <div className="mt-6 p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-700/50 rounded-2xl">
            <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              LSB Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(plots).map(([key, url]) => (
                <div key={key} className="text-center group cursor-pointer" onClick={() => {
                  setCurrentPlotKey(key);
                  setShowPlotModal(true);
                }}>
                  <h4 className="font-semibold text-gray-300 mb-2 group-hover:text-purple-400 transition-colors">
                    {key.charAt(0).toUpperCase() + key.slice(1)} LSB
                  </h4>
                  <div className="relative overflow-hidden rounded-xl border border-gray-600/50 group-hover:border-purple-500/50 transition-all duration-300">
                    <img
                      src={url}
                      alt={`${key} LSB`}
                      className="rounded border cursor-pointer"
                      onClick={() => {
                        setCurrentPlotKey(key);
                        setShowPlotModal(true);
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-purple-600/10 transition-all duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Plot Modal */}
      {showPlotModal && currentPlotKey && plots && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowPlotModal(false)}
        >
          <div
            className="bg-gray-800 border border-gray-700/50 p-6 rounded-2xl max-w-4xl max-h-[90vh] overflow-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-purple-400 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                {currentPlotKey.charAt(0).toUpperCase() + currentPlotKey.slice(1)} LSB Analysis
              </h3>
              <button
                onClick={() => setShowPlotModal(false)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-300"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={plots[currentPlotKey]}
                alt={`${currentPlotKey} LSB`}
                className="rounded border max-h-[70vh]"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors duration-300 flex items-center space-x-2"
                onClick={() => {
                  const idx = plotKeys.indexOf(currentPlotKey);
                  setCurrentPlotKey(plotKeys[(idx - 1 + plotKeys.length) % plotKeys.length]);
                }}
              >
                <span>⬅</span>
                <span>Previous</span>
              </button>
              <button
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors duration-300 flex items-center space-x-2"
                onClick={() => {
                  const idx = plotKeys.indexOf(currentPlotKey);
                  setCurrentPlotKey(plotKeys[(idx + 1) % plotKeys.length]);
                }}
              >
                <span>Next</span>
                <span>➡</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}