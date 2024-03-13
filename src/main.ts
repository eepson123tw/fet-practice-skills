import { createOverloadFunction } from "../utils/fn-overload";

const consoleStyle = "background-color: #13AA13; color: white; padding: 5px;";

// 考慮問題邊界
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
  while (1) {
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

// get parameter

const parseQuery = (url: String) => {
  const q: { [key: string]: string } = {};
  url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = v));
  return q;
};

console.log("%c parseQuery", consoleStyle, parseQuery("a=1&b=2"));

// pick obj by key
const pick = (obj: Object, ...props) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => {
      return props.includes(k);
    })
  );
};
console.log(
  "%c pick",
  consoleStyle,
  pick({ a: 123, b: 456, c: 789 }, "a", "b")
);

// random color

const randomColor = () =>
  "#" +
  Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0");

console.log("%c randomColor", consoleStyle, randomColor());

const randomString = () => Math.random().toString(36).slice(2);

console.log("%c randomString", consoleStyle, randomString());

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
  "%c 中斷請求是一個重要的知識點 可以使用 fetch XHR https://axios-http.com/docs/cancellation",
  consoleStyle
);

console.log(
  "%c localeCompare,比較中文字順序可以使用  https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare",
  consoleStyle
);

type BandType<T, K> = T extends K ? never : T;
function abc<T>(value: BandType<T, string>) {
  console.log(value);
}

// # generate random number
const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// parallel promise

function timeout(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

const SuperTask = () => {
  const tasks: { resolve: any; reject: any; task: any }[] = [];
  let parallelCount = 2;
  let runningCount = 0;
  const add = (task: Function) => {
    return new Promise((resolve, reject) => {
      tasks.push({ resolve, reject, task });
      run();
    });
  };
  const run = () => {
    while (runningCount < parallelCount && tasks.length > 0) {
      const taskItem = tasks.shift();
      if (taskItem) {
        const { resolve, reject, task } = taskItem;
        runningCount++;
        task()
          .then(resolve)
          .catch(reject)
          .finally(() => {
            runningCount--;
            run();
          });
      }
    }
  };
  return { add };
};

const superTask = SuperTask();

function addTask(time: number, name: string) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log("%c randomString", consoleStyle, name + "任務完成");
    });
}

addTask(10000, "1");
addTask(1000, "2");
addTask(1000, "3");
addTask(1000, "4");
addTask(1000, "5");

// add some thing into mirco task
function runMicroTask(func: Function) {
  if (typeof Promise !== "undefined") {
    Promise.resolve().then(() => {
      func();
      console.log("%c runMicroTask", consoleStyle, "runMicroTask");
    });
  }
  if (typeof MutationObserver !== "undefined") {
    const observer = new MutationObserver(() => {
      func();
      console.log("%c runMicroTask", consoleStyle, "runMicroTask");
    });
    observer.observe(document.body, {
      attributes: true,
    });
    document.body.setAttribute("id", "id");
  }
  // if (process && process.nextTick) {
  //   process.nextTick(func);
  //   return;
  // }
  setTimeout(func, 0);
}

runMicroTask(() =>
  console.log("%c runMicroTask", consoleStyle, "insert runMicroTask")
);

// add at timeout into fetch

function createRequestWithTimeout(timeout = 3000) {
  return function (url: string, option: RequestInit = {}) {
    return new Promise((resolve, reject) => {
      // so this is a promise status control, if promise is resolved,
      // it will not be rejected, otherwise it will be rejected
      const controller = new AbortController();
      if (option.signal) {
        const signal = option.signal;
        signal.addEventListener("abort", () => {
          controller.abort();
        });
      }
      option.signal = controller.signal;
      fetch(url, option).then(resolve, reject);
      setTimeout(() => {
        reject(new Error("timeout"));
        // so it will be rejected,and the error message is timeout
        controller.abort();
      }, timeout);
    });
  };
}

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
console.log(overloadFn("2", "3"));
