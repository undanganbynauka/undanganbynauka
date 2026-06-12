#!/bin/bash
cd /home/z/my-project
while true; do
  rm -f .next/dev/lock
  bun run dev
  sleep 2
done
