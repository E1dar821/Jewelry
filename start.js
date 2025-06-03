import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.join(__dirname, 'server');

console.log('Starting server from:', serverPath);

// Change to server directory and start the application
process.chdir(serverPath);

const server = spawn('node', ['src/index.js'], {
  stdio: 'inherit',
  cwd: serverPath
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
}); 