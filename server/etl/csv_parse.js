// const fs = require('fs');
// const { parse } = require('csv-parse');

// const parseData = (filename, saveTo) => {
//   fs.createReadStream(filename)
//   .pipe(parse({
//     delimiter: ',',
//     columns: true
//   })
//   .on('data', (row) => {
//     saveTo.push(row);
//   })
//   .on('end', () => {
//     console.log('finished');
//   })
//   .on('error', (err) => {
//     console.log(err.message);
//   }));
// };

// module.exports = parseData;