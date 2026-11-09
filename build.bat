@echo off
set PATH=%~dp0.bin\nodejs;%PATH%
echo ========================================================
echo Building Liya Py's Portfolio Website for Production...
echo ========================================================
node node_modules\vite\bin\vite.js build
echo ========================================================
echo Build complete! Static assets generated in dist/
echo ========================================================
pause

