# ❤️ CardioScan: Cardiovascular Heart Disease Prediction

**[Live Web Application: Run a Diagnostic Prediction](https://heart-disease-web-frontend.vercel.app/)**

A full-stack machine learning web application that evaluates 13 clinical biomarkers to predict the probability of cardiovascular heart disease in real-time. The application utilizes a trained Scikit-learn Random Forest model served via a high-performance Python backend.

## 🚀 Live Demo
* **Frontend UI:** [Access the Live Application](https://heart-disease-web-frontend.vercel.app/)
* **Backend API Health Check:** [View API Status](https://heart-disease-ui-wine.vercel.app/health)

## 🛠️ Tech Stack
* **Frontend:** Next.js, React, Tailwind CSS, TypeScript
* **Backend:** FastAPI, Python, Uvicorn
* **Machine Learning:** Scikit-learn, Pandas, Joblib (Random Forest Classifier)
* **Deployment:** Vercel (Serverless Functions for both Frontend and Backend)

## ✨ Key Features
* **Real-time ML Inference:** Instantly processes patient demographics, vitals, and blood chemistry to compute disease risk probability.
* **Clinical Evaluation Presets:** Includes pre-calibrated test cases (Low, Moderate, and High-Risk profiles) for quick demonstration and testing.
* **Cross-Origin Resource Sharing (CORS):** Fully configured to allow seamless, secure communication between the separated frontend and backend environments.

## 💻 Run Locally

### Prerequisites
* Node.js (v18+)
* Python (3.9+)

### 1. Start the Backend (FastAPI)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
