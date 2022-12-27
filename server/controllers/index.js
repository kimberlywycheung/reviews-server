var models = require('../models/index.js');

// models.getReviews('2', (data) => {
//   console.log(data);
// })

models.getMetadata('1', (data) => {
  console.log(data);
})

module.exports = {
  getReviews: (req, res) => {
    models.getReviews(req.params.product_id, (data, err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data)
      }
    })
  },
  getMetadata: (req, res) => {
    models.getMetadata(req.params.product_id, (data, err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data)
      }
    })
  },
  postReview: (req, res) => {

  },
  markHelpful: (req, res) => {

  },
  report: (req, res) => {

  }
};