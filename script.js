import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '30s'
  // scenarios: {
  //   constant_request_rate: {
  //     executor: 'constant-arrival-rate',
  //     rate: 1000,
  //     timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
  //     duration: '30s',
  //     preAllocatedVUs: 1, // how large the initial pool of VUs would be
  //     maxVUs: 2000, // if the preAllocatedVUs are not enough, we can initialize more
  //   }
  // }
};

const BASE_URL = 'http://localhost:8000';

export default function () {
  // set product id to random product within last 10% of dataset
  const product_id = Math.floor(Math.random() * (100001) + 900009);

  // check get reviews
  const reviews = http.get(http.url`${BASE_URL}/reviews/${product_id}`);
  check(reviews, {
    'GET reviews status is successful': (res) => res.status === 200,
    'GET review response exists': (res) => res.body.length > 0
  });

  // check getMetadata
  const metadata = http.get(http.url`${BASE_URL}/reviews/meta/${product_id}`);
  check(metadata, {
    'GET metadata status is successful': (res) => res.status === 200,
    'GET metadata response exists': (res) => res.body.length > 0
  });

  // set review id to random product within last 10% of dataset
  const review_id = Math.floor(Math.random() * (5774952) + 5197456);

  // check put for helpful
  const markHelpful = http.put(http.url`${BASE_URL}/reviews/${review_id}/helpful`);
  check(markHelpful, {
    'PUT helpful status is successful': (res) => res.status === 204,
  });

  // check put for reported
  const report = http.put(http.url`${BASE_URL}/reviews/${review_id}/report`);
  check(report, {
    'PUT report status is successful': (res) => res.status === 204,
  });

  // check post for new review for current product
  const newReview = {
    product_id: product_id,
    rating: 4,
    summary: 'very awesome product i would buy it again and again',
    body: 'the best thing i\'ve bought in a while - as mentioned i would buy it again and again',
    recommend: true,
    name: 'thisisausername',
    email: 'thisis@nemail.com',
    photos: ['url1', 'url2', 'url3'],
    characteristics: { '14': 4, '15': 5}
  };

  const post = http.post(
    http.url`${BASE_URL}/reviews`,
    JSON.stringify(newReview),
    { headers: { 'Content-Type': 'application/json' }}
  );
  check(post, {
    'POST report status is successful': (res) => res.status === 201
  });

  sleep(1);
};