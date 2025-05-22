#!/bin/bash
cd /home/kavia/workspace/code-generation/reactquizmaster-95557-95563/reactquizmaster
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

