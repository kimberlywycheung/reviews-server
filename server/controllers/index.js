var models = require('../models/index.js');

module.exports = {
  getReviews: (req, res) => {
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
    models.postReview(req.body, (data, err) => {
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