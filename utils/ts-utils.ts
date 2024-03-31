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
