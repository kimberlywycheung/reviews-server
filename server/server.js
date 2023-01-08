const cluster = require('node:cluster');
const http = require('node:http');
const { cpus } = require('node:os');
const process = require('node:process');

const app = require('./index.js');

const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.listen(8000, console.log(`Worker ${process.pid} running on http://localhost:8000`));
}