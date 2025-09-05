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
    <div className="bg-gray-800 p-6 rounded-2xl shadow-md relative">
      <form>
        <h2 className="md:text-xl font-semibold mb-4">Encode Message</h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-2 p-2 rounded file:cursor-pointer file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded file:border-none hover:file:bg-blue-700 transition"
          required
        />
        <div className="flex md:flex-row md:items-center gap-2">
          <input
            type="text"
            placeholder="Enter secret message"
            value={message}
            onChange={(e) => {
              const filtered = e.target.value.replace(
                /[^\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?`~]/g,
                ""
              );
              setMessage(filtered);
            }}
            className="w-full p-2 mb-2 border-b-2 border-gray-600 focus:outline-none focus:border-blue-500 transition"
            required
          />

          <button
            onClick={handleEncode}
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-50 disabled:bg-gray-500 disabled:cursor-not-allowed transition"
            disabled={loading || !file || !message}
          >
            {loading ? "⏳ Encoding..." : "Encode"}
          </button>
        </div>
      </form>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-2 mt-4">
        {loading && (
          <div className="mt-4 w-full">
            <p className="text-gray-300">Encoding in progress...</p>
            <div className="w-full bg-gray-600 rounded h-4 mt-2">
              <div
                className="bg-green-500 h-4 rounded transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm mt-1">{progress}%</p>
          </div>
        )}

        <div
          className={`transition-opacity duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {encodedUrl && (
            <div className="mt-4 flex-1 flex flex-col items-center">
              <h3 className="text-lg font-semibold">Encoded Image</h3>
              <img
                src={encodedUrl}
                alt="Encoded"
                className="rounded mt-2 border min-w-30 max-w-50"
              />
              <button
                onClick={handleDownload}
                type="button"
                className="mt-2 px-3 py-1 rounded text-sm border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition"
              >
                Download Image
              </button>
            </div>
          )}

          {plots && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(plots).map(([key, url]) => (
                <div key={key} className="text-center">
                  <h3 className="font-semibold">
                    {key.charAt(0).toUpperCase() + key.slice(1)} LSB
                  </h3>
                  <img
                    src={url}
                    alt={`${key} LSB`}
                    className="rounded border cursor-pointer"
                    onClick={() => {
                      setCurrentPlotKey(key);
                      setShowPlotModal(true);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showPlotModal && currentPlotKey && plots && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setShowPlotModal(false)}
        >
          <div
            className="bg-white p-4 rounded-xl max-w-4xl max-h-[90vh] overflow-auto relative"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-black">
                📊 {currentPlotKey.charAt(0).toUpperCase() + currentPlotKey.slice(1)} LSB
              </h3>
              <button
                type="button"
                onClick={() => setShowPlotModal(false)}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm text-white"
              >
                Close
              </button>
            </div>

            <div className="mt-4 flex flex-col items-center">
              <img
                src={plots[currentPlotKey]}
                alt={`${currentPlotKey} LSB`}
                className="rounded border max-h-[70vh]"
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-4">
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => {
                  const idx = plotKeys.indexOf(currentPlotKey);
                  setCurrentPlotKey(
                    plotKeys[(idx - 1 + plotKeys.length) % plotKeys.length]
                  );
                }}
              >
                ⬅ Prev
              </button>

              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => {
                  const idx = plotKeys.indexOf(currentPlotKey);
                  setCurrentPlotKey(plotKeys[(idx + 1) % plotKeys.length]);
                }}
              >
                Next ➡
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
