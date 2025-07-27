#!/bin/bash
if [ "$1" = "down" ]; then
  docker compose down
elif [ "$1" = "reset" ]; then
  docker compose down -v
else
  docker compose up --build
fi
