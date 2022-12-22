import postgres from 'postgres';

const sql = postgres('postgres://127.0.0.1:27017/sdc', {
  host: '',
  port: 27017,
  database: sdc,
  username: root,
  password: ''
});