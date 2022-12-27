var express = require('express');
var db = require('./db/postgres.js');
var controller = require('./controllers/index.js');
//middleware
var cors = require('cors');
var morgan = require('morgan');

var app = express();
// app.set('port', 3000);

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// router
app.get('/reviews/:product_id', controller.getReviews);
app.get('/reviews/meta/:product_id', controller.getMetadata);
app.post('/reviews', controller.postReview);
app.put('/reviews/:review_id/helpful', controller.markHelpful);
app.put('/reviews/:review_id/report', controller.report);

// serve client files
// app.use(express.static(__dirname + '../../TechStyles/client/src'));

app.listen(8000, console.log(`Now listening on http://localhost:8000`));

module.exports.app = app;
