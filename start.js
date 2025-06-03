import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.join(__dirname, 'server');

console.log('🔍 Debug Information:');
console.log('Current directory:', process.cwd());
console.log('Script directory:', __dirname);
console.log('Server path:', serverPath);
console.log('Server path exists:', fs.existsSync(serverPath));

// Check if server directory exists
if (!fs.existsSync(serverPath)) {
  console.error('❌ Server directory not found:', serverPath);
  process.exit(1);
}

// Check if node_modules exists in server directory
const nodeModulesPath = path.join(serverPath, 'node_modules');
console.log('Node modules path:', nodeModulesPath);
console.log('Node modules exists:', fs.existsSync(nodeModulesPath));

// Check if express is installed
const expressPath = path.join(nodeModulesPath, 'express');
console.log('Express path:', expressPath);
console.log('Express exists:', fs.existsSync(expressPath));

// Check package.json
const packageJsonPath = path.join(serverPath, 'package.json');
console.log('Package.json path:', packageJsonPath);
console.log('Package.json exists:', fs.existsSync(packageJsonPath));

if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  console.log('Server dependencies:', Object.keys(packageJson.dependencies || {}));
}

console.log('🚀 Starting server from:', serverPath);

// Change to server directory and start the application
process.chdir(serverPath);
console.log('📁 Changed working directory to:', process.cwd());

const server = spawn('node', ['src/index.js'], {
  stdio: 'inherit',
  cwd: serverPath,
  env: { ...process.env, NODE_ENV: 'production' }
});

server.on('error', (err) => {
  console.error('❌ Failed to start server:', err);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`👋 Server process exited with code ${code}`);
  process.exit(code);
}); 