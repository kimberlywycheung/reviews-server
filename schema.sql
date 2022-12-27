DROP DATABASE IF EXISTS rr;

CREATE DATABASE rr;
\connect rr;

CREATE TABLE reviews (
  id INTEGER PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR(1000) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN DEFAULT false NOT NULL,
  reviewer_name VARCHAR(100) NOT NULL,
  reviewer_email VARCHAR(100) NOT NULL,
  response VARCHAR DEFAULT null NOT NULL,
  helpfulness INTEGER NOT NULL
);

CREATE TABLE photos (
  id INTEGER PRIMARY KEY NOT NULL,
  review_id INTEGER NOT NULL,
  url VARCHAR(1000) NOT NULL
  -- CONSTRAINT fk_reviewid FOREIGN KEY (review_id) REFERENCES reviews(id)
);

CREATE TABLE characteristics (
  id INTEGER PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE review_characteristics (
  id INTEGER PRIMARY KEY NOT NULL,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL
  -- CONSTRAINT fk_charid FOREIGN KEY (characteristic_id) REFERENCES characteristics(id),
  -- CONSTRAINT fk_reviewid FOREIGN KEY (review_id) REFERENCES reviews(id)
);

-- EXTRACT/LOAD
\copy reviews FROM '/Users/kim/Desktop/HackReactor/SDC/reviews-server/dataset/reviews.csv' DELIMITER ',' CSV HEADER;
\copy photos FROM '/Users/kim/Desktop/HackReactor/SDC/reviews-server/dataset/reviews_photos.csv' DELIMITER ',' CSV HEADER;
\copy review_characteristics FROM '/Users/kim/Desktop/HackReactor/SDC/reviews-server/dataset/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
\copy characteristics FROM '/Users/kim/Desktop/HackReactor/SDC/reviews-server/dataset/characteristics.csv' DELIMITER ',' CSV HEADER;

-- TRANSFORM

-- CREATE INDEX product_id ON reviews (id ASC);
-- CREATE INDEX review_id ON photos(review_id ASC);
-- CREATE INDEX char_prod_id ON characteristics(product_id ASC);
-- CREATE INDEX char_review_id ON review_characteristics(characteristic_id, review_id);
-- CREATE INDEX product_id ON reviews(id);



-- CREATE TABLE reviews (
--   review_id SERIAL NOT NULL PRIMARY KEY,
--   rating INTEGER NOT NULL,
--   summary VARCHAR (60) NOT NULL,
--   recommend BOOLEAN NOT NULL,
--   response VARCHAR (255),
--   body VARCHAR (1000) NOT NULL,
--   date TIMESTAMPTZ NOT NULL,
--   reviewer_name VARCHAR (255) NOT NULL,
--   reviewer_email VARCHAR (255) NOT NULL,
--   helpfulness INTEGER NOT NULL,
--   photos VARCHAR[],
--   reported BOOLEAN
-- );

-- CREATE TABLE products (
--   id SERIAL PRIMARY KEY NOT NULL,
--   product INTEGER NOT NULL,
  -- page INTEGER NOT NULL,
  -- count INTEGER NOT NULL,
--   results INTEGER[] NOT NULL,
--   CONSTRAINT fk_results FOREIGN KEY (results) REFERENCES reviews(review_id)
-- );
--   -- page INTEGER NOT NULL,
--   -- count INTEGER NOT NULL,

-- CREATE TABLE metadata (
--   product_id INTEGER NOT NULL PRIMARY KEY,
--   ratings INTEGER [],
--   recommended INTEGER [],
--   characteristics DOUBLE PRECISION[][]
-- );