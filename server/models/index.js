var pool = require('../db/postgres.js');
const { v4: uuidv4 } = require('uuid');

const addDoubleQuotes = (string) => {
  if (string.indexOf("'") > -1) {
    string = string.replace("'", "''");
  }
  return string;
}

module.exports = {
  getReviews: (id, cb) => {
    let reviews = {
      product: id,
      page: 0,
      count: 0,
      results: []
    };

    pool
      .query(`
        SELECT r.* FROM reviews r WHERE r.product_id = ${id} AND r.reported = false;
      `)
      .then(({ rows }) => {

        rows.forEach((review) => {
          let reviewObj = {
            review_id: review.id,
            rating: review.rating,
            summary: review.summary,
            recommend: review.recommend,
            response: review.response,
            body: review.body,
            date: new Date(review.date),
            reviewer_name: review.reviewer_name,
            reviewer_email: review.reviewer_email,
            helpfulness: review.helpfulness,
            reported: review.reported,
            photos: review.photos
          };

          reviews.results.push(reviewObj);
          reviews.count += 1;
          reviews.page = reviews.count > 2 ? Math.ceil(reviews.count / 2) : 0;
        });

        cb(reviews);
      })
      .catch((err) => setImmediate(() => console.log(err)));
  },

  getMetadata: (id, cb) => {
    let metadata = {
      product_id: id,
      ratings: {},
      recommend: {},
      characteristics: {},
    };

    pool
      .query(`
        SELECT
          rr.ratings::varchar,
          rr.recommendations::varchar,
          json_agg(jsonb_build_object(cv.name, cv.values)) AS chars
        FROM (
          SELECT
            product_id,
            json_agg(r.rating) AS ratings,
            json_agg(r.recommend) AS recommendations
          FROM reviews r
          WHERE r.product_id = ${id}
          GROUP BY r.product_id
        ) rr
        JOIN (
          SELECT
              c.product_id,
              c.name,
              json_agg(json_build_object('id', cr.id, 'value', cr.value)) as values
            FROM characteristics c
              LEFT JOIN review_characteristics cr
              ON c.id = cr.characteristic_id
            WHERE c.product_id = ${id}
            GROUP BY c.id
        ) cv
        ON cv.product_id = rr.product_id
        GROUP BY rr.ratings::varchar, rr.recommendations::varchar;
      `)
      .then(({ rows }) => {
        const ratings = rows[0].ratings.replace('[', '').replace(']', '').split(', ');
        const recs = rows[0].recommendations.replace('[', '').replace(']', '').split(', ');
        const chars = rows[0].chars;

        // parse through ratings
        for (let i = 0; i < ratings.length; i++) {
          metadata.ratings[ratings[i]] = metadata.ratings[ratings[i]] + 1 || 1;
        }

        // parse through recommendations
        for (let i = 0; i < recs.length; i++) {
          metadata.recommend[recs[i]] = metadata.recommend[recs[i]] + 1 || 1;
        }
        // parse through characteristics
        for (let i = 0; i < chars.length; i++) {
          for (let charName in chars[i]) {
            metadata.characteristics[charName] = metadata.characteristics[charName] || { value: 0 };
            for (let j = 0; j < chars[i][charName].length; j++) {
              metadata.characteristics[charName].value += chars[i][charName][j].value;
            }
            metadata.characteristics[charName].value /= parseFloat(chars[i][charName].length);
          }
        }
        cb(metadata);
      })
      .catch((err) => setImmediate(() => console.log(err)));
  },

  postReview: async (review, cb) => {
    let reviewId = 0;

    const date = new Date();
    let summary = addDoubleQuotes(review.summary);
    let body = addDoubleQuotes(review.body);
    let name = addDoubleQuotes(review.name);

    const photos = JSON.stringify(review.photos.map((url) => {
      return {
        id: uuidv4(),
        url: url
      }
    }));

    // add to reviews table
    await pool
      .query(`
          INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email, photos)
          VALUES (${review.product_id}, ${review.rating}, ${date.getTime()}, '${summary}',
            '${body}', ${review.recommend}, '${name}', '${review.email}', '${photos}')
          RETURNING id;
      `)
      .then(({ rows }) => { reviewId = rows[0].id })
      .catch((err) => setImmediate(() => console.log(err)));

    // add to review_characteristics table
    let characteristicsString = [];
    for (let key in review.characteristics) {
      characteristicsString.push(`(${reviewId}, ${key}, ${review.characteristics[key]})`);
    }

    await pool
      .query(`
        INSERT INTO review_characteristics (review_id, characteristic_id, value)
        VALUES ${characteristicsString.join(', ')};
      `)
      .catch((err) => setImmediate(() => console.log(err)));

    cb();
  },

  markHelpful: (id, cb) => {
    pool
      .query(`
        UPDATE reviews
        SET helpfulness = (SELECT helpfulness FROM reviews WHERE id = ${id}) + 1
        WHERE id = ${id};
      `)
      .then(() => cb())
      .catch((err) => setImmediate(() => console.log(err)));
  },

  report: (id, cb) => {
    pool
      .query(`
        UPDATE reviews SET reported = true WHERE id = ${id};
      `)
      .then(() => cb())
      .catch((err) => setImmediate(() => console.log(err)));
  }
};