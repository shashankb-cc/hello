import { expect, test } from "vitest";
import { isPrime, generatePrimeSeries } from "./prime";

test("isPrime tests", () => {
  expect(isPrime(2)).toBe(true);
  expect(isPrime(5)).toBe(true);
  expect(isPrime(29)).toBe(true);
  expect(isPrime(999999000001)).toBe(true);
  expect(isPrime(4)).toBe(false);
  expect(isPrime(6)).toBe(false);
  expect(isPrime(67280421310721)).toBe(true);
  expect(() => isPrime(-2)).toThrow();
  expect(() => isPrime("sai")).toThrow();
});

test("should throw an error for invalid inputs", () => {
  expect(generatePrimeSeries(3)).toEqual([2, 3, 5]);
  expect(generatePrimeSeries(5)).toEqual([2, 3, 5, 7, 11]);
  expect(() => generatePrimeSeries(-1)).toThrow(
    "Argument should be greater than or equal to 1"
  );
  expect(() => generatePrimeSeries("abc")).toThrow(
    "Argument should be a number"
  );
});
