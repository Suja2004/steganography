const BASE_URL = "https://steganography-4a5q.onrender.com";
// const BASE_URL = "http://127.0.0.1:5000";

/**
 * Encode an image with a secret message
 * @param {File} imageFile - Cover image file
 * @param {string} message - Secret message to hide
 * @returns {Promise<Object>} - JSON response from backend
 */
export async function encodeImage(imageFile, message) {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("message", message);

  const response = await fetch(`${BASE_URL}/encode`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to encode image");
  }

  return response.json();
}

/**
 * Decode a secret message from an encoded image
 * @param {File} imageFile - Encoded image file
 * @returns {Promise<Object>} - JSON response from backend
 */
export async function decodeImage(imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${BASE_URL}/decode`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to decode image");
  }

  return response.json();
}

export { BASE_URL };
