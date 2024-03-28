/**
 * Create a function that can have multiple implementations based on the type of the arguments
 * @example
 * const fn = createOverloadFunction();
 * fn.addImplementation(String, String, (a, b) => a + b);
 * fn.addImplementation(Number, Number, (a, b) => a + b);
 * fn.addImplementation(String, Number, (a, b) => a + b);
 * fn("a", "b"); // "ab"
 * fn(1, 2); // 3
 * fn("a", 2); // "a2"
 */
export function createOverloadFunction() {
  const map = new Map();

  function overloadFunction(...args: unknown[]) {
    const key = args
      .map((arg) => (arg === null ? "null" : typeof arg))
      .join(", ");
    const fn = map.get(key);
    if (!fn) {
      throw new Error("No implementation found");
    }
    return fn(...args);
  }
  overloadFunction.addImplementation = function (...args: unknown[]) {
    const fn = args.pop();
    if (typeof fn !== "function") {
      throw new Error("Last argument should be a function");
    }
    map.set(args.join(", ").toLowerCase(), fn);
  };
  return overloadFunction;
}

const overloadFn = createOverloadFunction();
overloadFn.addImplementation(
  "String",
  "String",
  (a: string, b: string) => a + b
);
overloadFn.addImplementation(
  "Number",
  "Number",
  (a: number, b: number) => a * b
);
console.log(overloadFn(2, 3));
