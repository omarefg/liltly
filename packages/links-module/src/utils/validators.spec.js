/**
 * Story: Create an strategy that allows to validate if an string is an URL
 * Case 1: Given an string with an URL format when the validator reads it then it must return true
 *
 * Case 2: Given an string with a non-url format when the validator readts it then it must
 * return false
 */

const faker = require('faker');
const validators = require('./validators');

describe('Validators', () => {
  describe('isValidURL', () => {
    it('Given a string with a valid URL format then the function must return true', () => {
      // Arrange
      const url = faker.internet.url();
      // Act
      const isValid = validators.isValidURL(url);
      // Assert
      expect(isValid).toBe(true);
    });

    it('Given a string with a valid URL format then the function must return true', () => {
      // Arrange
      const url = faker.random.alpha();
      // Act
      const isValid = validators.isValidURL(url);
      // Assert
      expect(isValid).toBe(false);
    });

    it('Given a non string value, the function must return false', () => {
      // Arrange
      const edgeCases = [null, undefined, {}, faker.random.number(), faker.random.float()];

      // Act
      edgeCases.forEach((caseValue) => {
        const isValid = validators.isValidURL(caseValue);

        // Assert
        expect(isValid).toBe(false);
      });
    });
  });
});
