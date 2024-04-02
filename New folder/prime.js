import { input } from "@inquirer/prompts";

import assert from "assert";

function generatePrimeSeries(count) {
  //pre-condition
  assert(typeof count === "number", "Argument should be a number");
  assert(count > 0, "Argument should be greater than or equal to 1");

  const primeNumbers = [];
  let firstNum = 2;
  while (primeNumbers.length < count) {
    if (isPrime(firstNum)) {
      primeNumbers.push(firstNum);
    }
    firstNum++;
  }
  return primeNumbers;
}

function isPrime(num) {
  // pre conditions
  //its must always a number
  assert(typeof num === "number", "Argument should be a number");
  //  primes are always > 1, and they will have a factor other than themselves or 1
  assert(num > 1, "Argument should be greater than 1");

  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}
// module.exports = isPrime;

//Post-conditions for isPrime function

//Test cases (postive)
// assert(isPrime(2), "2 is a prime number");
// assert(isPrime(5), "5 is a prime number");
// assert(isPrime(29), "29 is  a prime number");
// assert(isPrime(999999000001), "999999000001 is a prime number");
// assert(!isPrime(4), "4 is not a prime number");
// assert(!isPrime(6), "6 is not a prime number");
// assert(isPrime(67280421310721), "67280421310721 is not a prime number");

//Test cases (negative)

assert.throws(
  () => !isPrime(-2),
  /Argument should be greater than 1/,
  "Negative numbers cannot be a prime numbers"
);
assert.throws(
  () => !isPrime(0),
  /Argument should be greater than 1/,
  "Negative numbers cannot be a prime numbers"
);
assert.throws(
  () => !isPrime("a"),
  /Argument should be a number/,
  "The type should be a number"
);

//Post-conditions for generatePrimeSeries

assert.deepStrictEqual(
  generatePrimeSeries(5),
  [2, 3, 5, 7, 11],
  "Count 5 must return [2,3,5,7,11]"
);
assert.deepStrictEqual(generatePrimeSeries(1), [2], "Count 1 must return [2]");
assert.deepStrictEqual(
  generatePrimeSeries(3),
  [2, 3, 5],
  "Count 3 must return [2,3,5]"
);

assert.throws(
  () => generatePrimeSeries(-1),
  /Argument should be greater than or equal to 1/,
  "The value must be greater than 0"
);
assert.throws(
  () => generatePrimeSeries("a"),
  /Argument should be a number/,
  "The value must be a number"
);
assert.throws(
  () => generatePrimeSeries([]),
  /Argument should be a number/,
  "The value must be a number"
);

export { isPrime, generatePrimeSeries };