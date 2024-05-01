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
