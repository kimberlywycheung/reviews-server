import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '50s',
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(99)<1500'], // 95% of requests should be below 1.5s
  },
};

const BASE_URL = 'http://localhost:8000';

export default function () {
  // check get for random product within 10% of dataset
    let i = Math.floor(Math.random()* (900000) + 900338);
    const reviews = http.get(http.url`${BASE_URL}/reviews/${i}`);
    check(reviews, {
      'GET status is 200': (res) => res.status === 200,
      'GET response exists': (res) => res.body.length > 0
    });

  sleep(1);
};

// const payload = JSON.stringify({
//   name: 'lorem',
//   surname: 'ipsum',
// });

// const headers = { 'Content-Type': 'application/json' };
// const res = http.post('https://httpbin.test.k6.io/post', payload, { headers });

// check(res, {
//   'Post status is 200': (r) => res.status === 200,
//   'Post Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',
//   'Post response name': (r) => res.status === 200 && res.json().json.name === 'lorem',
// });