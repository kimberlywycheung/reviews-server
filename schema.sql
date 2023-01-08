DROP DATABASE IF EXISTS rr;

CREATE DATABASE rr;
\connect rr;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  date BIGINT NOT NULL,
  summary VARCHAR(1000) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  recommend BOOLEAN NOT NULL,
  reported BOOLEAN DEFAULT false,
  reviewer_name VARCHAR(100) NOT NULL,
  reviewer_email VARCHAR(100) NOT NULL,
  response VARCHAR DEFAULT null,
  helpfulness INTEGER DEFAULT 0
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  url VARCHAR(1000) NOT NULL
);

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE review_characteristics (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL
);

-- EXTRACT/LOAD
\copy reviews FROM '/Users/kim/Desktop/HackReactor/SDC/reviews-server/dataset/reviews.csv' DELIMITER ',' CSV HEADER;
SELECT setVal('"reviews_id_seq"', (SELECT MAX (id) FROM reviews) + 1);

\copy photos FROM '/Users/kim/Desktop/HackReactor/SDC/reviews-server/dataset/reviews_photos.csv' DELIMITER ',' CSV HEADER;
SELECT setVal('"photos_id_seq"', (SELECT MAX (id) FROM photos) + 1);

\copy review_characteristics FROM '/Users/kim/Desktop/HackReactor/SDC/reviews-server/dataset/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
SELECT setVal('"review_characteristics_id_seq"', (SELECT MAX (id) FROM review_characteristics) + 1);

\copy characteristics FROM '/Users/kim/Desktop/HackReactor/SDC/reviews-server/dataset/characteristics.csv' DELIMITER ',' CSV HEADER;
SELECT setVal('"characteristics_id_seq"', (SELECT MAX (id) FROM characteristics) + 1);

-- TRANSFORM

-- Indexes and clusters
CREATE INDEX r_id ON reviews (id ASC);
CREATE INDEX r_product_id ON reviews (product_id ASC);
CLUSTER reviews USING r_product_id;
CREATE INDEX p_review_id ON photos(review_id ASC);
CREATE INDEX char_prod_id ON characteristics(product_id ASC);
CREATE INDEX char_r_id ON review_characteristics(characteristic_id);

-- Add photos to reviews table
ALTER TABLE reviews
  ADD photos jsonb DEFAULT '[]'::jsonb;

UPDATE reviews
SET photos=(SELECT JSON_AGG(JSON_BUILD_OBJECT('id', p.id, 'url', p.url)::jsonb)
  FROM photos p
  WHERE reviews.id = p.review_id);
