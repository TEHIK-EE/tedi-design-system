import { AssertionError } from 'assert';

export const assertIsString = (value: unknown): asserts value is string => {
  if (typeof value !== 'string') {
    throw new AssertionError({ message: `Value is not a string! - ${value}` });
  }
};
