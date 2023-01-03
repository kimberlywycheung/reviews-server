const fs = require('fs');
const { parse } = require('csv-parse');
var pool = require('../db/postgres.js');

let reviews = [];
let photos = [];
let characteristics = [];
let review_characteristics = [];

const parseData = (filename, saveTo) => {
  fs.createReadStream(filename)
  .pipe(parse({
    delimiter: ',',
    columns: true
  })
  .on('data', (row) => {
    saveTo.push(row);
  })
  .on('end', () => {
    console.log('finished');
  })
  .on('error', (err) => {
    console.log(err.message);
  }));
};