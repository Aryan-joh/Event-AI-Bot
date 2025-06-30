# 🎉 Event Estimator & Negotiation Bot 

A smart and interactive AI-powered assistant that helps users estimate and negotiate costs for events based on their needs — manually or by uploading a PDF, Excel, or image!

Built with:
- 🧠 Google Gemini API for AI reasoning
- 🐍 FastAPI (Python) for backend
- ⚛️ React + TailwindCSS for frontend
- 📄 OCR, Excel & PDF parsing for automated analysis

---

## ✨ Features

- Manual cost estimation and AI negotiation
- Upload PDF, Excel, or image to extract event details and estimate
- Toggle between estimation, negotiation, or both
- Auto-scroll to results after submission

---

## ⚙️ Backend Setup (Python - FastAPI)

> 📝 Make sure you have **Python 3.10+** installed and preferably use a virtual environment.

### 🔧 Installation Steps

```bash
# Step 1: Clone the project
git clone https://github.com/Aryan-joh/event-bot.git
cd event-bot/backend

# Step 2: Create and activate virtual environment
python -m venv venv
venv\Scripts\activate   # On Windows
# Or
source venv/bin/activate  # On macOS/Linux

# Step 3: Install dependencies
pip install -r requirements.txt

# If requirements.txt not available, manually install:
pip install fastapi uvicorn python-dotenv pydantic google-generativeai python-multipart pytesseract openpyxl PyMuPDF pillow

# Step 4: Run the backend server
uvicorn main:app --reload

---------------------------------------------------------------------------------------------------------------------------------------
### FOR FRONTEND SETUP (React + Tailwind)

# Step 1: Go to the frontend directory
cd ../frontend

# Step 2: Install dependencies
npm install

# Step 3: Start the frontend dev server
npm run dev

FOR ANY DOUBT
Contact:
Aryan K.
aryanradical08@gmail.com
