@echo off
echo Starting MERN + Python Recommendation App...

echo 1. Starting Python Backend...
start cmd /k "cd recommendation && if not exist venv (python -m venv venv && call venv\Scripts\activate && pip install -r requirements.txt) else (call venv\Scripts\activate) && uvicorn main:app --reload --port 8001"

echo 2. Starting Node.js Backend...
start cmd /k "cd backend && npm install && npm start"

echo 3. Starting React Frontend...
start cmd /k "cd frontend && npm install && npm run dev"

echo All services started! Check the separate terminal windows.
pause
