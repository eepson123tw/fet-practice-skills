/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { consoleStyle } from "../utils/console";
import "../utils/fn-overload";
import "../utils/promise-task";
import "../utils/enum";
// import "../utils/koa-task";

// import singleton from "../utils/singleton-proxy";
// import "../utils/groupby";

// 考慮問題邊界
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isOdd = (n: number) => {
  return n % 2 === 1 || n % 2 === -1;
};

// 創建二維螺旋陣列
function vortex(n: number, m: number) {
  const num = new Array(n).fill(0).map(() => new Array(m).fill(0));
  let i = 0; // 行數
  let j = 0; // 列數
  let count = 1; //指針
  let stepI = 0; // 每次I增加數值
  let stepJ = 1; // 每次J增加數值
  function hasBlock() {
    return !num[i] || num[i][j] !== 0;
  }
  // eslint-disable-next-line no-constant-condition
  while (true) {
    num[i][j] = count++;
    // 改變 ij
    i += stepI;
    j += stepJ;
    //是否應該轉彎
    if (hasBlock()) {
      i -= stepI; // 到回去
      j -= stepJ;
      if (stepI === 0) {
        stepI = stepJ;
        stepJ = 0;
      } else {
        stepJ = -stepI;
        stepI = 0;
      }
      i += stepI;
      j += stepJ;
      if (hasBlock()) {
        break;
      }
    }
  }
  return num;
}
console.log(vortex(4, 5));

// get uri parameter

const parseQuery = (url: string) => {
  const q: { [key: string]: string } = {};
  url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v));
  return q;
};

console.log("%cparse query => Obj", consoleStyle, parseQuery("a=1&b=2"));

// pick obj by key
const pick = (obj: NonNullable<unknown>, ...props: string[]) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => {
      return props.includes(k);
    })
  );
};
console.log(
  "%cpick key in a obj",
  consoleStyle,
  pick({ a: 123, b: 456, c: 789 }, "a", "b")
);

// random color

const randomColor = () =>
  "#" +
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0");

console.log("%crandomColor", consoleStyle, randomColor());

const randomString = () => Math.random().toString(36).slice(2);

console.log("%crandomString", consoleStyle, randomString());

// reject prev promise with fetch

let controller: AbortController;
const input = document.createElement("input");
input.oninput = async () => {
  if (controller) {
    controller.abort();
  }
  controller = new AbortController();
  const list = await fetch("asdasdasdadsd" + input.value, {
    signal: controller.signal,
  }).then((res) => res.json());
  console.log(list);
};

console.log(
  "%c中斷請求是一個重要的知識點 可以使用 fetch XHR https://axios-http.com/docs/cancellation",
  consoleStyle
);

console.log(
  "%clocaleCompare,比較中文字順序可以使用  https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare",
  consoleStyle
);

type BandType<T, K> = T extends K ? never : T;

function abc<T>(value: BandType<T, string>) {
  console.log(value);
}

// # generate random number
const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// defer with animation frame

function useDefer(maxCount = 100) {
  let count = 0;
  const run = () => {
    requestAnimationFrame(() => {
      count++;
      if (count >= maxCount) {
        return;
      }
      run();
    });
  };
  run();
  return (n: number) => {
    return count >= n;
  };
}

// class MyClass {
//   constructor() {}
// }

// const sClass: typeof ObjectConstructor = singleton(MyClass);

// const v1 = new sClass();
// const v2 = new sClass();

// console.log(v1 instanceof sClass, v2 instanceof sClass, v1 === v2);

// debounce with type

// const count = (n: number, m: number) => {
//   return n + m;
// };

// type debounce<T extends unknown[], K> = (
//   fn: (...args: T) => K,
//   duration: number
// ) => (...args: T) => void;

// type Watcher<T> = {
//   on<K extends keyof T & string>(
//     eventName: `${K}Changed`,
//     callback: (oldValue: T[K], newValue: T[K]) => void
//   ): void;
// };

// declare const createWatcher: <T>(obj: T) => Watcher<T>;

// const watcher = createWatcher({
//   apple: 1,
//   banana: 2,
//   isRAG: false,
// });

// watcher.on("appleChanged", (oldValue, newValue) => {
//   console.log(oldValue, newValue);
// });

const functionWrapperWithTypeCheck = <T>(obj: T) => {
  return {
    on: <K extends keyof T & string>(
      a: `${K}Changed`,
      b: (a: T[K], b: T) => void
    ) => {
      console.log(a, b, obj);
    },
  };
};

const fnWrapper = functionWrapperWithTypeCheck({
  apple: 1,
  banana: 2,
  isRAG: false,
});

fnWrapper.on("bananaChanged", (a, b) => {
  console.log(a, b);
});

declare global {
  interface Function {
    myBind<
      ThisType,
      BoundArgs extends any[],
      RemainingArgs extends any[],
      ReturnType
    >(
      this: (
        this: ThisType,
        ...args: [...BoundArgs, ...RemainingArgs]
      ) => ReturnType,
      thisArg: ThisType,
      ...boundArgs: BoundArgs
    ): (...args: RemainingArgs) => ReturnType;
    myCall<ThisType, ReturnType>(
      this: (...args: any[]) => ReturnType,
      ctx: ThisType | null | undefined,
      ...args: Parameters<typeof this>
    ): ReturnType;
  }
}
// write mycall to the function prototype
Function.prototype.myCall = function <T, R>(
  this: (...args: any[]) => R,
  ctx: T | null | undefined,
  ...args: Parameters<typeof this>
): R {
  ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx);
  const key = Symbol();
  const fn = this as typeof this;
  Object.defineProperty(ctx, key, {
    value: fn,
    enumerable: false,
  });
  const res = (ctx as T & Record<symbol, typeof this>)[key](...args);
  delete (ctx as T & Record<symbol, typeof this>)[key];
  return res;
};

// write myBind to the function prototype
Function.prototype.myBind = function <
  ThisType,
  BoundArgs extends any[],
  RemainingArgs extends any[],
  ReturnType
>(
  this: (
    this: ThisType,
    ...args: [...BoundArgs, ...RemainingArgs]
  ) => ReturnType,
  thisArg: ThisType,
  ...boundArgs: BoundArgs
): (...args: RemainingArgs) => ReturnType {
  return (...args2: RemainingArgs): ReturnType => {
    return this.apply(thisArg, [...boundArgs, ...args2]);
  };
};

// 使用範例
function add(a: number, b: number): number {
  return a + b;
}

const aBind = add.myBind(null, 1, 2);
const aCall = add.myCall(null, 1, 2);
console.log(aCall); // 3
console.log(aBind()); // 3
