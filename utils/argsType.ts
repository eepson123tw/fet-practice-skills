type JSTypeMap = {
  string: string;
  number: number;
  boolean: boolean;
  object: object;
  undefined: undefined;
  null: null;
};

type JSTypeNames = keyof JSTypeMap;

type ArgType<T extends JSTypeNames[]> = {
  [K in keyof T]: JSTypeMap[T[K]];
};

declare function applyType<T extends JSTypeNames[]>(
  ...args: [...T, (...args: ArgType<T>) => unknown]
): void;

applyType("boolean", "boolean", (a, b) => {});

/**
 *  ()=> R
 *  (a: A) => R
 *  (p)=> 新的函數
 */

type Curry<A extends unknown[], R> = A extends []
  ? () => R
  : A extends [infer ARG]
    ? (p: ARG) => R
    : A extends [infer ARG, ...infer REST]
      ? (p: ARG) => Curry<REST, R>
      : never;

declare function curry<A extends unknown[], R>(
  func: (...args: A) => R,
): Curry<A, R>;

function sum(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedSum = curry(sum);
const r = curriedSum(2)(1)(3);
console.log(r);

//type ReturnType<T>

type ReturnMyType<T> = T extends (...args: unknown[]) => infer R ? R : never;

type A = ReturnMyType<() => string>; // string

// type FirstArg<T> // 獲取函数的第一个參數

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FirstArg<T> = T extends (x: infer R, ...args: any[]) => unknown
  ? R
  : never;

type B = FirstArg<(a: number, b: string) => unknown>; // number

// type PromiseType<T> // 獲取Promise的返回值類型

type PromiseType<T> =
  T extends Promise<infer R>
    ? R extends Promise<infer S>
      ? PromiseType<S>
      : R
    : never;

type C = PromiseType<Promise<string>>; // string

// type ArrayType<T> // 獲取數组元素的類型

type ArrayType<T> = T extends (infer R)[] ? R : never;

type D = ArrayType<number[] | string[]>; // number
