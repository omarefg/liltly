const {
  logger,
  BusinessError,
  validators,
  constants: { errorTypes },
} = require('../utils');

const createShortURL = ({ model, idGenerator }) => async ({ originalURL, fullHostnameURL }) => {
  if (!validators.isValidURL(originalURL) || !validators.isValidURL(fullHostnameURL)) {
    logger.error('[lt-links-module]: The URL provided is not valid');

    throw new BusinessError(errorTypes.URL_NOT_VALID, 'links-module');
  }

  logger.info(`[lt-links-module]: Creating short URL for ${originalURL}`);

  let shortURL;

  try {
    shortURL = await model.create({
      originalURL,
      hash: idGenerator.generate(),
    });
  } catch (error) {
    logger.error('[pl-links-module]: Error creating short URL: ', error.message);
    throw new BusinessError(errorTypes.WRITE_DATABASE_ERROR, 'link-module');
  }

  return `${fullHostnameURL}/${shortURL.hash}`;
};

module.exports = {
  createShortURL,
};
