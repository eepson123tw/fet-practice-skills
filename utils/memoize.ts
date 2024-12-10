class MemoizedMap {
  _weakmap: WeakMap<WeakKey, unknown>;
  _map: Map<unknown, unknown>;
  constructor() {
    this._map = new Map();
    this._weakmap = new WeakMap();
  }
  _isObject(key: unknown) {
    return typeof key === "object" && key !== null;
  }
  get(key: unknown) {
    if (this._isObject(key)) {
      return this._weakmap.get(key as WeakKey);
    }
    return this._map.get(key);
  }
  set(key: unknown, value: unknown) {
    if (this._isObject(key)) {
      this._weakmap.set(key as WeakKey, value);
    } else {
      this._map.set(key, value);
    }
  }
  has(key: unknown) {
    if (this._isObject(key)) {
      return this._weakmap.has(key as WeakKey);
    }
    return this._map.has(key);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function memoize(func, resolver) {
  function memoized(...args) {
    const cache = memoized.cache;
    const key = resolver ? resolver(...args) : args[0];
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, args);
    cache.set(key, result);
    return result;
  }
  memoized.cache = new MemoizedMap();
  return memoized;
}

const memoized = memoize(
  (a, b) => {
    console.log("Calculating...");
    return a + b;
  },
  (a, b) => a + b,
);

console.log(memoized(1, 2));
