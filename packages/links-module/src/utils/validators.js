const logger = require('./logger');

const isValidURL = (url) => {
  let validUrl = null;
  try {
    validUrl = new URL(url);
  } catch (error) {
    logger.error('[lt-links-module]: The URL is not valid');
  }
  return Boolean(validUrl);
};

module.exports = {
  isValidURL,
};
