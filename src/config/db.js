const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// const db = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: process.env.DB_PORT,
//   // ssl: {
//   //   rejectUnauthorized: false,
//   // },
// });

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};

if (process.env.APP_STATUS === 'production') {
  config.ssl = {
    rejectUnauthorized: false,
  };
}

const db = new Pool(config);

db.connect((err) => {
  if (err) {
    console.log(err);
  }
});

module.exports = db;
