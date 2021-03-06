/**
 *
 */

const faker = require('faker');
const linkUseCases = require('./link');

describe('Link Use Cases', () => {
  describe('createShortURL', () => {
    it('Given a valid URL then the function must return a short URL', async () => {
      // Arrange
      const originalURL = faker.internet.url();
      const fullHostnameURL = faker.internet.url();
      const hash = faker.random.uuid();
      const linkObjectModel = {
        _id: faker.random.uuid(),
        originalURL,
        hash,
      };
      const dependencies = {
        model: {
          create: jest.fn(() => Promise.resolve(linkObjectModel)),
        },
        idGenerator: {
          generate: jest.fn(() => hash),
        },
      };

      // Act
      const shortUrlBuilder = linkUseCases.createShortURL(dependencies);
      const shortUrl = await shortUrlBuilder({ originalURL, fullHostnameURL });

      // Assert
      expect(shortUrl).toBe(`${fullHostnameURL}/${hash}`);
      expect(dependencies.model.create).toHaveBeenCalledTimes(1);
      expect(dependencies.model.create).toHaveBeenCalledWith({ originalURL, hash });
      expect(dependencies.idGenerator.generate).toHaveBeenCalledTimes(1);
      expect(dependencies.idGenerator.generate).toHaveBeenCalledWith();
    });

    it('Given a invalid URL the function must thrown an error', async () => {
      // Arrange
      const originalURL = faker.internet.domainName();
      const fullHostnameURL = faker.internet.url();
      const dependencies = {
        model: {
          create: jest.fn(),
        },
        idGenerator: {
          generate: jest.fn(),
        },
      };

      // Act
      const shortUrlBuilder = linkUseCases.createShortURL(dependencies);

      // Asserts
      await expect(shortUrlBuilder({ originalURL, fullHostnameURL })).rejects.toThrow();
      expect(dependencies.model.create).not.toHaveBeenCalled();
      expect(dependencies.idGenerator.generate).not.toHaveBeenCalled();
    });
  });

  describe('readUrlByHash', () => {
    it('Given a valid has the function must return a promise that resolves an URL', async () => {
      // Arrange
      const hash = faker.random.alpha();
      const linkObjectModel = {
        _id: faker.random.uuid(),
        hash,
      };
      const dependencies = {
        model: {
          findOne: jest.fn(() => Promise.resolve(linkObjectModel)),
        },
      };

      // Act
      const shortUrlReader = linkUseCases.readUrlByHash(dependencies);
      const shortUrl = await shortUrlReader({ hash });

      // Assert
      expect(shortUrl).toEqual(linkObjectModel);
      expect(dependencies.model.findOne).toHaveBeenCalled();
    });

    it('Given an invalid hash the function must throw an error', async () => {
      // Arrange
      const hash = null;
      const dependencies = { model: { findOne: jest.fn() } };
      // Act
      const shortUrlReader = linkUseCases.readUrlByHash(dependencies);
      // Assert
      await expect(shortUrlReader({ hash })).rejects.toThrow();
    });
  });
});
