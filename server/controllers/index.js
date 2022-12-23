var models = require('../models');

models.getReviews('40349', (data) => {
  console.log(data);
})

module.exports = {
  getReviews: (req, res) => {

  },
  getMetadata: (req, res) => {

  },
  postReview: (req, res) => {

  },
  markHelpful: (req, res) => {

  },
  report: (req, res) => {

  }
};