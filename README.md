# Parkinson AI - Early Detection & Voice Monitoring System

An end-to-end AI-powered platform for early detection and continuous monitoring of Parkinson's Disease using voice biomarker analysis and machine learning.

---

## 📁 Repository Structure

```
.
├── backend/            # FastAPI backend service, API endpoints, auth, and database
├── frontend/           # React + Vite frontend user interface
├── ml-model/           # ML training pipeline, audio feature extractors, and notebooks
├── .gitignore          # Git ignore rules for Python, Node, and IDE files
└── README.md           # Project documentation
```

---

## 🚀 Quick Start Guide

### 1. Backend Service (`/backend`)
FastAPI application with database integration, authentication, and voice analysis APIs.
```bash
cd backend
pip install -r requirements.txt
python run.py
```
- API Docs: `http://localhost:8000/api/docs`

### 2. Frontend Application (`/frontend`)
React UI for voice recording upload, dashboard visualization, and analysis reports.
```bash
cd frontend
npm install
npm run dev
```
- Web App: `http://localhost:5173`

### 3. ML Model & Audio Pipeline (`/ml-model`)
Machine learning model training (Random Forest, SVM, XGBoost) and audio feature extraction (MDVP & MFCC biomarkers).
```bash
cd ml-model
pip install -r requirements.txt
python src/models/train_rf.py
```

---

## 🛠️ Deployment with Docker

Run the full system using Docker Compose:
```bash
cd backend
docker-compose up -d
```

---

## 📄 License
This project is for research and educational purposes.
