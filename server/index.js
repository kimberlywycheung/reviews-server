var express = require('express');
var db = require('./db');
//middleware
var cors = require('cors');
var morgan = require('morgan');

var app = express();
module.exports.app = app;

app.set('port', 3000);

app.user(cors());
app.use(morgan('dev'));
app.use(express.json());

// router
app.get('/reviews/:product_id', controller.getReviews);
app.get('/reviews/meta/:product_id', controller.getMetadata);
app.post('/reviews', controller.postReview);
app.put('/reviews/:review_id/helpful', controller.markHelpful);
app.put('/reviews/:review_id/report', controller.report);

// serve client files
app.use(express.static(__dirname + '../../TechStyles/client/src'));

app.listen();
