import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    database: process.env.DEV_DATABASE_URL,
    password: process.env.DEV_DATABASE_URL,
    username: process.env.DEV_DATABASE_URL,
    JWT_KEY: process.env.JWT_KEY,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    database: process.env.TEST_DATABASE_URL,
    password: process.env.TEST_DB_PASSWORD,
    username: process.env.TEST_DB_USERNAME,
    JWT_KEY: process.env.JWT_KEY,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    JWT_KEY: process.env.JWT_KEY,
    dialect: 'postgres',
  },
};
