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
  });
});
