var { Pool } = require('pg');

var pool = new Pool({
  host: 'localhost',
  database: 'sdc',
  user: 'kim',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});