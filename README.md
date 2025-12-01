# FortressX

FortressX is a modern, fast, and user-friendly audio translation app built with a **Flutter frontend** and a **Python backend**.  
It focuses on seamless **speech-to-text**, **real-time translation**, and **saved PDF outputs** for users who want quick and reliable multilingual communication.

---

##  Features

-  **Speech-to-Text** (online processing)  
-  **Real-Time Translation**  
-  **Save Translated Text as PDF**  
-  **Flutter Frontend (Android & iOS)**  
-  **Python Backend with API Integration**  
-  Secure, fast, and lightweight

---

## Tech Stack

### **Frontend**
- Flutter  
- Dart  
- Provider / Riverpod (optional)

### **Backend**
- Python (FastAPI or Flask)  
- Translation API (Google, LibreTranslate, or other supported APIs)

### **Storage**
- Local storage for PDFs  
- Cloud optional (Firebase / Supabase)

---

## 📦 Project Structure (Suggested)FortressX/
├── frontend/
│   ├── lib/
│   ├── assets/
│   └── pubspec.yaml
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── services/
└── README.md

---

## ⚙️ Installation & Setup

### **Frontend (Flutter)**

```bash
cd frontend
flutter pub get
flutter run