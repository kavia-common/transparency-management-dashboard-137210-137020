#!/bin/bash
cd /home/kavia/workspace/code-generation/transparency-management-dashboard-137210-137020/admin_dashboard_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

