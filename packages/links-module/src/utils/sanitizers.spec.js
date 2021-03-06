const faker = require('faker');
const { BusinessError } = require('.');
const sanitizers = require('./sanitizers');

describe('Sanitizers', () => {
  describe('errorFieldParser', () => {
    it('Given a valid field, then the function must return a parsed string', () => {
      // Arrange
      const field = faker.random.word();

      // Act
      const parsedField = sanitizers.errorFieldParser(field);

      // Assert
      expect(parsedField).toBe(`FIELD_${field.toUpperCase()}_IS_REQUIRED`);
    });

    it('Given a not valid field then the function must throw an error', () => {
      // Arrange
      const field = null;

      // Act
      const parseField = () => { sanitizers.errorFieldParser(field); };

      // Assert
      expect(parseField).toThrow(BusinessError);
    });
  });
});
