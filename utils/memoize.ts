class MemoizedMap {
  _weakmap: WeakMap<WeakKey, any>;
  _map: Map<any, any>;
  constructor() {
    this._map = new Map();
    this._weakmap = new WeakMap();
  }
  _isObject(key: any) {
    return typeof key === "object" && key !== null;
  }
  get(key: any) {
    if (this._isObject(key)) {
      return this._weakmap.get(key);
    }
    return this._map.get(key);
  }
  set(key: any, value: any) {
    if (this._isObject(key)) {
      this._weakmap.set(key, value);
    } else {
      this._map.set(key, value);
    }
  }
  has(key: any) {
    if (this._isObject(key)) {
      return this._weakmap.has(key);
    }
    return this._map.has(key);
  }
}

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
