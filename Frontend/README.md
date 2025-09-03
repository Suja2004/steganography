# 🔐 Image Steganography (LSB with Visualization)

This project is a **web-based application** that allows you to **hide secret messages inside images** using the **Least Significant Bit (LSB)** technique.  
It also generates **visual plots** of the LSB matrices (before and after encoding) so you can see how the image changes at the binary level.  

Frontend: **React**  
Backend: **Flask (Python)**  

---

## ✨ Features
- Upload an image and encode a secret message.  
- Download the encoded image.  
- Visualize **LSB matrices** (original, encoded, and difference).  
- Fake progress bar for smoother UI feedback.  
- Works with large images efficiently (parallelized encoding).  

---

## 🛠️ Tech Stack
- **Frontend:** React, TailwindCSS  
- **Backend:** Flask, Flask-CORS, NumPy, Pillow, Matplotlib  
- **Other Tools:** Concurrent Futures for parallel processing  

---

## 🚀 Installation & Setup

### 1️⃣ Backend (Flask)
# Clone repository
```
git clone https://github.com/Suja2004/steganography.git
cd steganography-app/Backend
```

# Create virtual environment
```
python -m venv venv
```

```
source venv/bin/activate   # (Linux/Mac)
```

```
venv\Scripts\activate      # (Windows)
```


# Install dependencies
```
pip install -r requirements.txt
```

# Run Flask server
```
python app.py
```

The Flask server will start at:
👉 http://127.0.0.1:5000

### 2️⃣ Frontend (React)
```
cd ../Frontend
```

# Install dependencies
```
npm install
```

# Run development server
```
npm start
```

React app will start at:
👉 http://localhost:3000


### 📸 Usage

* Open the React frontend in browser.

* Upload an image (PNG/JPG).

* Enter the secret message.

* Click Encode → Encoded image & plots will be generated.

* Download the encoded image or expand the plot to see binary changes.