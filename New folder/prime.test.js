import { isPrime, generatePrimeSeries } from "./prime";
import { expect, test } from "vitest";
import assert from "assert";

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
