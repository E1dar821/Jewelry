#!/bin/bash

echo "🔍 Debug Information:"
echo "Current directory: $(pwd)"
echo "Contents of current directory:"
ls -la

echo "📁 Changing to server directory..."
cd server

echo "Current directory after cd: $(pwd)"
echo "Contents of server directory:"
ls -la

echo "📦 Checking node_modules..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules directory exists"
    echo "Express module exists: $(test -d node_modules/express && echo 'YES' || echo 'NO')"
else
    echo "❌ node_modules directory NOT found"
    echo "Installing dependencies..."
    npm install
fi

echo "📋 Package.json contents:"
cat package.json

echo "🚀 Starting server..."
npm start 