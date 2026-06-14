import { spawn } from 'child_process';
import { createServer } from 'http';
import http from 'http';

let serverProcess = null;
let serverReady = false;

function startServer() {
  if (serverProcess) {
    try { serverProcess.kill(); } catch(e) {}
  }
  
  serverReady = false;
  serverProcess = spawn('bun', ['.next/standalone/server.js'], {
    cwd: '/home/z/my-project',
    env: { ...process.env, NODE_ENV: 'production', PORT: '3001', HOSTNAME: '0.0.0.0' },
    stdio: 'ignore',
    detached: false
  });
  
  serverProcess.on('exit', () => {
    serverReady = false;
    serverProcess = null;
    // Restart after 1 second
    setTimeout(startServer, 1000);
  });
  
  // Wait for server to be ready
  const checkReady = () => {
    http.get('http://localhost:3001/template', (res) => {
      serverReady = true;
    }).on('error', () => {
      setTimeout(checkReady, 200);
    });
  };
  setTimeout(checkReady, 500);
}

startServer();

// Proxy on port 3000 → port 3001
createServer((req, res) => {
  const proxy = http.request({
    hostname: 'localhost',
    port: 3001,
    path: req.url,
    method: req.method,
    headers: req.headers
  }, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });
  
  proxy.on('error', () => {
    res.writeHead(503);
    res.end('Server starting... please refresh in a moment.');
  });
  
  req.pipe(proxy);
}).listen(3000, '0.0.0.0', () => {
  console.log('Persistent proxy running on port 3000');
});
