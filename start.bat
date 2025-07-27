@echo off
if "%1"=="down" (
    docker compose down 
) else  if  "%1"=="reset" (
    docker compose down -v
) else (
    docker compose up --build
)
pause