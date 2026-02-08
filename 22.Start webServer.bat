@echo off
echo Starting up...
cd web-desktop
timeout /t 1
start cmd /k "npx serve -p 3001"
exit