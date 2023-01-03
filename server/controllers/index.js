var models = require('../models/index.js');

module.exports = {
  getReviews: (req, res) => {
    console.log('getting reviews');
    models.getReviews(req.params.product_id, (data, err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },
  getMetadata: (req, res) => {
    models.getMetadata(req.params.product_id, (data, err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },
  postReview: (req, res) => {
    console.log(req);
    console.log(req.data);
    console.log(req.body);
    models.postReview(req.data, (data, err) => {
      if (err) {
        res.status(401).send(err);
      } else {
        res.status(201).send();
      }
    });
  },
  markHelpful: (req, res) => {
    models.markHelpful(req.params.review_id, (data, err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send();
      }
    });
  },
  report: (req, res) => {
    models.report(req.params.review_id, (data, err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(204).send();
      }
    });
  }
};