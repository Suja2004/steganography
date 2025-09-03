from flask import Flask, request, jsonify, send_file, send_from_directory
from flask_cors import CORS
from encode import BinaryMatrixSteganography
from decode import BinaryMatrixSteganographyDecoder
import os
import shutil
from werkzeug.utils import secure_filename
import time
from PIL import Image

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def clear_uploads():
    """Delete all files inside the uploads folder before saving new ones."""
    for filename in os.listdir(UPLOAD_FOLDER):
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.remove(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print(f"Failed to delete {file_path}: {e}")


@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "ok", "message": "Steganography API running"})


@app.route("/encode", methods=["POST"])
def encode():
    if "image" not in request.files or "message" not in request.form:
        return jsonify({"error": "Image and message required"}), 400

    clear_uploads()

    image = request.files["image"]
    message = request.form["message"]

    filename = secure_filename(image.filename)
    input_path = os.path.join(UPLOAD_FOLDER, filename)
    output_path = os.path.join(UPLOAD_FOLDER, "encoded_" + filename)

    # 👇 unique plot filename using timestamp
    plot_filename = f"lsb_plot_{int(time.time())}.png"
    plot_path = os.path.join(UPLOAD_FOLDER, plot_filename)

    image.save(input_path)

    analyzer = BinaryMatrixSteganography()
    analyzer.encode_text_with_matrices(input_path, message, output_path)

    img = Image.open(input_path)
    if img.mode != 'RGB':
        img = img.convert('RGB')

    width, height = img.size    

    analyzer.show_binary_matrices(
        matrix_size=(width, height), save_path=plot_path)
    return jsonify({
        "encoded_image": f"/uploads/encoded_{filename}",
        "lsb_plot": f"/uploads/{plot_filename}"
    })


@app.route("/decode", methods=["POST"])
def decode():
    if "image" not in request.files:
        return jsonify({"error": "Image required"}), 400

    clear_uploads()

    image = request.files["image"]
    filename = secure_filename(image.filename)
    input_path = os.path.join(UPLOAD_FOLDER, filename)
    image.save(input_path)

    decoder = BinaryMatrixSteganographyDecoder()
    message = decoder.decode_and_verify(input_path)

    return jsonify({"message": message})


@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
