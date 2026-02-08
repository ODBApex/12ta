@echo off
echo Starting up...
cd web-desktop
timeout /t 1
start cmd /k "npm i serve"
exit