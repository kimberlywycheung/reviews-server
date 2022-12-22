DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;
USE sdc;

CREATE TABLE products (
  product INTEGER NOT NULL PRIMARY KEY,
  page INTEGER,
  count INTEGER,
  results INTEGER,
  FOREIGN KEY (results) REFERENCES reviews(review_id)
);

CREATE TABLE reviews (
  review_id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  rating INTEGER,
  summary VARCHAR,
  recommend BOOLEAN,
  response VARCHAR,
  body VARCHAR,
  date TIMESTAMPTZ,
  reviewer_name VARCHAR,
  helpfulness INTEGER,
  photos VARCHAR [],
  reported BOOLEAN
);

CREATE TABLE metadata (
  product_id INTEGER NOT NULL PRIMARY KEY,
  ratings INTEGER [],
  recommended INTEGER [],
  characteristics DOUBLE PRECISION [][]
);