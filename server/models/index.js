var pool = require('../db/postgres.js');

module.exports = {
  getReviews: (id, cb) => {
    pool
      .query(`SELECT * FROM reviews WHERE reviews.product_id = ${id} limit 10`)
      .then((res) => cb(res.rows))
      .catch((err) => setImmediate(() => console.log(err)));
  },
  getMetadata: (id, cb) => {

  },
  postReview: (review, cb) => {

  },
  markHelpful: (id, cb) => {

  },
  report: (id, cb) => {

  }
};