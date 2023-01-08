const cluster = require('cluster');
const http = require('http');
const numCPUs = require("os").cpus().length;
const process = require('process');
const app = require('./index.js');

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  app.listen(8000, console.log(`Worker ${process.pid} running on http://localhost:8000`));
}