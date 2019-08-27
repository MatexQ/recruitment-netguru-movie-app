import { lowercaseKeys } from './omdbapi';

describe('UTILS', () => {
  describe('lowercaseKeys', () => {

    const test = {
      Field1: 'key1',
      Field2: 'key2',
    };

    const expectedTest = {
      field1: 'key1',
      field2: 'key2',
    };

    it('should return object with lowercase keys', () => {
      expect(lowercaseKeys(test)).toEqual(expectedTest);
    });
  });
});
