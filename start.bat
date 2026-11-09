@echo off
set PATH=%~dp0.bin\nodejs;%PATH%
echo ========================================================
echo Starting Liya Py's Portfolio Website...
echo Open your browser at: http://localhost:3000
echo ========================================================
node node_modules\vite\bin\vite.js --port 3000 --host

