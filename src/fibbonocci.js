import assert from "assert";

function fib(index) {
  // preconditions
  assert(typeof index === "number", "Argument must be a number");
  assert(index >= 0, "Argument must be greater than or equal to 0");
  // above 98 the value of fibbonocci series exceeds the js precision scale
  assert(index <= 98, "Index value must be less than 99");

  if (index <= 1) {
    return BigInt(index);
  }
  let a = 0;
  let b = 1;
  // eslint-disable-next-line no-plusplus
  for (let i = 2; i <= index; i++) {
    const next = a + b;
    a = b;
    b = next;
  }
  return b;
}

assert.equal(fib(0), 0, `Value for index 0 is 0`);
assert.equal(fib(1), 1, `Value for index 1 is 1`);
assert.equal(fib(2), 1, `Value for index 2 is 1`);
assert.equal(fib(3), 2, `Value for index 3 is 2`);
assert.equal(fib(4), 3, `Value for index 4 is 3`);
assert.equal(fib(5), 5, `Value for index 5 is 5`);
assert.equal(fib(6), 8, `Value for index 6 is 8`);
assert.equal(fib(50), 12586269025, `Value for index 50 is 12586269025`);
assert.deepStrictEqual(
  fib(98),
  135301852344706760000,
  `Value for index 98 is 135301852344706760000`,
);

// eslint-disable-next-line max-len
// 98 is the last number to which we can calculate the fibonocci series in the javascipt precison scale
// assert.equal(fib(99),218922995834555169026, `Value for index 99 is 218922995834555169026`);

assert.throws(() => fib("a"), Error, "Argument must be a number");
assert.throws(() => fib([]), Error, "Argument must be a number");
assert.throws(
  () => fib(-1),
  Error,
  "Argument must be greater than or equal to 0",
);
assert.throws(() => fib(99), Error, "Argument value  must be less than 99");
