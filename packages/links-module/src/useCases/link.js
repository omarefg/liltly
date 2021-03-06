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
    logger.error('[lt-links-module]: Error creating short URL: ', error.message);
    throw new BusinessError(errorTypes.WRITE_DATABASE_ERROR, 'link-module');
  }

  return `${fullHostnameURL}/${shortURL.hash}`;
};

const readUrlByHash = ({ model }) => async ({ hash, fieldsSelector = { _id: 1 } }) => {
  if (!hash) {
    logger.error('[lt-links-module]: Te hash parameter is required');
    throw new BusinessError();
  }

  logger.info('[lt-links-module]: Reading URL by hash');

  return model.findOne({ hash }, fieldsSelector);
};

module.exports = {
  createShortURL,
  readUrlByHash,
};
