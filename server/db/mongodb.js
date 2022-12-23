const mongoose = require('mongoose');

mongoose.set("strictQuery", true);
mongoose.connect(`mongodb://127.0.0.1:27017/sdc`);

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    review_id: Number,
    rating: Number,
    summary: String,
    recommend: Boolean,
    response: String,
    body: String,
    date: Date,
    reviewer_name: String,
    helpfulness: Number,
    photos: Array,
    reported: Boolean
  }, { autoCreate: false, autoIndex: false }
);

const reviewsSchema = new Schema({
  product: Number,
  page: Number,
  count: Number,
  results: mongoose.Schema.Types.ObjectId
}, { autoCreate: false, autoIndex: false });

const metadataSchema = new Schema({
  product_id: Number,
  ratings: Object,
  recommended: Object,
  characteristics: Object
}, { autoCreate: false, autoIndex: false });

const review = new mongoose.model('Review', reviewSchema);
const reviews = new mongoose.model('Reviews', reviewsSchema);
const metadata = new mongoose.model('MetaData', metadataSchema);

review.createCollection();
reviews.createCollection();
metadata.createCollection();