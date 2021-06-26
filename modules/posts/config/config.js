require('dotenv').config({path: __dirname+'/./../../../.env'});//take note to direct path of .env for usability
//also if using config.js, change index.js to config/config.js from config/config.json
module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_TABLE,
    "host": process.env.DB_HOST,
    "dialect": process.env.DB_DIALECT
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_TABLE_TEST,
    "host": process.env.DB_HOST_TEST,
    "dialect": process.env.DB_DIALECT
  },
  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_TABLE_PROD,
    "host": process.env.DB_HOST_PROD,
    "dialect": process.env.DB_DIALECT
  }
}
