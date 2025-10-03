@echo off
echo Starting LinkedIn Content Formatter...

echo.
echo Starting Backend Server...
cd backend
start "Backend Server" cmd /k "pip install -r requirements.txt && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000"

echo.
echo Waiting for backend to start...
timeout /t 5 /nobreak > nul

echo.
echo Starting Frontend Server...
cd ..\frontend
start "Frontend Server" cmd /k "npm install && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
