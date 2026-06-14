#!/bin/bash
while true; do
  cd /home/z/my-project
  PORT=3000 NODE_ENV=production node .next/standalone/server.js 2>>/tmp/srv-err.log
  echo "DIED at $(date)" >> /tmp/srv-err.log
  sleep 1
done
