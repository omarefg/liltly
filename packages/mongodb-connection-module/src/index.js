const Mongoose = require('mongoose');

const config = require('../config/database');
const logger = require('./utils/logger');

Mongoose.Promise = global.Promise;

const db = Mongoose.createConnection(config.mongodb.uri, {
  useNewUrlParser: true,
  auth: {
    user: config.mongodb.user,
    password: config.mongodb.pass,
  },
});

db.on('error', (error) => {
  logger.error(`[lt-mongodbconnection-module]: Connection error event ${error.message}`);
  process.exit(1);
});
db.once('open', () => logger.info('[lt-mongodbconnection-module]: Connection opened with the DB'));
db.on('connected', () => logger.info(`[lt-mongodbconnection-module]: Mongoose connection is opened to ${config.mongodb.uri}`));
db.on('disconnected', () => logger.info('[lt-mongodbconnection-module]: Mongoose connection is closed'));

process.on('SIGINT', () => {
  db.close(() => {
    logger.info('[lt-mongodbconnection-module]: Mongo connection has been disconnected due to application termination');
    process.exit(1);
  });
});

module.exports = db;
