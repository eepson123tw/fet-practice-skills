/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Represents a watcher that listens for changes on specific properties of an object.
 * @template T - The type of the object being watched.
 * Registers a callback function to be called when the specified property changes.
 * @template K - The key of the property being watched.
 * @param eventName - The name of the event to listen for, in the format `${propertyName}Changed`.
 * @param callback - The callback function to be called when the property changes.
 *                   It receives the old value and the new value of the property as arguments.
 */
type Watcher<T> = {
  on<K extends keyof T>(
    eventName: `${K & string}Changed`,
    callback: (oldValue: T[K], newValue: T[K]) => void
  ): void;
};

/**
 * Creates a watcher for the given object.
 * @template T - The type of the object to watch.
 * @param obj - The object to watch.
 * @returns A watcher object that can be used to listen for property changes.
 */
declare function watch<T>(obj: T): Watcher<T>;

const obj = watch({ name: "123", age: 123 });
obj.on("ageChanged", (oldValue: number, newValue: number) => {
  console.log(oldValue, newValue);
});

interface ComplexObject {
  name?: string;
  age?: number;
  location: string;
}

/**
 * Represents a type that includes only the optional properties of the given type.
 * @template T - The type to extract optional properties from.
 * Extracts the optional properties from the given type.
 * @template K - The keys of the properties in the original type.
 * @returns A new type that includes only the optional properties.
 */
type GetOptional<T> = {
  [K in keyof T as undefined extends Pick<T, K> ? K : never]: T[K];
};

let key: GetOptional<ComplexObject>;

const a: typeof key = {
  name: "123",
  age: 123,
};

console.log(a);

type UnionType =
  | {
      name: string;
      age: number;
    }
  | {
      location: string;
    };

const data1: UnionType = {
  name: "123",
  age: 123,
};

type IntersectionType = {
  name: string;
  age: number;
} & {
  location: string;
};

const data2 = {
  name: "123",
  age: 123,
  location: "123",
};

type UnionTypeA = ("a" | "n" | number) & string;

type WrapNaked<T> = T extends unknown ? { value: T } : never;
type Foo = WrapNaked<string | number | boolean>;

/**
 *
 * string extends unknown ? { value: T} : b | number extends unknown ? { value: T} : b | boolean extends unknown ? { value: T} : b
 * { value: string } | { value: number } | { value: boolean }
 */

/**
 *
 * string | number  extends xxx ? a : b
 * string extends xxx ? a : b | number extends xxx ? a : b
 *
 */

type Union2Intersection<U> = (U extends any ? (x: U) => any : never) extends (
  x: infer I
) => any
  ? I
  : never;

type A = Union2Intersection<{ a: string } | { b: string }>;

/**
 * # type algorithms
 * typeof to get the type of a variable , [if typeof use with a constructor function it will return the type of the instance]
 * keyof to get the keys of an object, class instance, or interface to gain the type of the keys
 * in to iterate over the keys of an object, will combine with keyof
 * infer to infer a type from another type
 * extends to check if a type extends another type
 * ? to conditionally select types
 * as to type cast
 * & to create intersection types
 * | to create union types
 */

class User {
  name: string;
  age: number;
  location: string;
}

const newUser = (X: typeof User) => {
  return new X();
};

const aUser = newUser(User);

interface IUser {
  name: string;
  age: number;
  location: string;
}

function printUserProperty(obj: IUser, props: string & Lowercase<keyof IUser>) {
  console.log(obj[props]);
}

printUserProperty({ name: "123", age: 123, location: "123" }, "location");
// to let obj key be IUser key
type StringType<T> = {
  [P in keyof T]: string;
};

type PartialType<T> = {
  [p in keyof T]?: T[p];
};

type RequiredType<T> = {
  [p in keyof T]-?: T[p];
};

type ReadonlyType<T> = {
  readonly [p in keyof T]: T[p];
};

type ExcludeType<T, U> = T extends U ? never : T;

type ExtractType<T, U> = T extends U ? T : never;

type NonNullableType<T> = T extends null | undefined ? never : T;

type ReturnTypeType<T> = T extends (...args: any[]) => infer R ? R : never;

type InstanceTypeType<T> = T extends new (...args: any[]) => infer R
  ? R
  : never;

const u: PartialType<IUser> = {
  name: "123",
  age: 123,
  location: "123",
};

const x: StringType<IUser> = {
  name: "123",
  age: "123123",
  location: "123",
};

const exclude: ExcludeType<
  "a" | "b" | "c" | "d" | null | undefined,
  null | undefined
> = "b";

const extract: ExtractType<
  "a" | "b" | "c" | "d" | null | undefined,
  null | undefined
> = null;

const nonNullable: NonNullableType<string | null | undefined> = "123";

const returnType: ReturnTypeType<() => { name: string }> = { name: "123" };

function foo(x: number, y: number): number {
  return x + y;
}

type fooType = ReturnTypeType<typeof foo>;

type instanceType = InstanceTypeType<typeof User>;

type twoParams = new (x: any, y: any) => User;

const A: twoParams = class Test extends User {
  name = "123";
  age = 123;
  location = "123123";
  constructor(x: number, y: number) {
    super();
  }
};

const map = {
  name: "Allen",
  age: 123,
  location: false,
};

const isEnumValue =
  <T extends object>(map: T) =>
  (value: unknown): value is T[keyof T] =>
    Object.values(map).includes(value);
const isEnumKey =
  <T extends { [p: string]: T[keyof T] }>(map: T) =>
  (key: string): key is Extract<keyof T, string> =>
    Object.keys(map).includes(key);

const value = isEnumValue(map);
const keyEnum = isEnumKey(map);
