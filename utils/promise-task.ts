import { consoleStyle, promiseStyle } from "../utils/console";
// to store the event promise task

// parallel promise

function timeout(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

const SuperTask = () => {
  const tasks: {
    resolve: (value: unknown) => void;
    reject: (value: unknown) => void;
    task: () => Promise<unknown>;
  }[] = [];
  const parallelCount = 2;
  let runningCount = 0;
  const add = (task: () => Promise<unknown>) => {
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
      console.log("%cParallel Promise Task", consoleStyle, name + "任務完成");
    });
}

addTask(10000, "1");
addTask(1000, "2");
addTask(1000, "3");
addTask(1000, "4");
addTask(1000, "5");

// add some thing into mirco task
function runMicroTask(func: () => void) {
  if (typeof Promise !== "undefined") {
    Promise.resolve().then(() => {
      func();
      console.log("%crunMicroTask", consoleStyle, "runMicroTask");
    });
  }
  if (typeof MutationObserver !== "undefined") {
    const observer = new MutationObserver(() => {
      func();
      console.log("%crunMicroTask", consoleStyle, "runMicroTask");
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
  console.log("%crunMicroTask", consoleStyle, "insert runMicroTask")
);

// add at timeout into fetch

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

/**
 * Execute a time-consuming task.
 * If the task needs to be executed asynchronously, return a promise.
 * If the task needs to be executed as soon as possible without blocking, use a callback.
 * Aim to be compatible with various browsers.
 */
function runThousandTask(taskNum: number = 100) {
  function __runTask(task: () => void, resolve: (value: unknown) => void) {
    const start = Date.now();
    requestAnimationFrame(() => {
      if (Date.now() - start >= 16.6) {
        task();
        resolve(null);
      } else {
        __runTask(task, resolve);
      }
    });
  }

  for (let i = 1; i <= taskNum; i++) {
    new Promise((resolve) => {
      setTimeout(() => {
        __runTask(
          () => console.log(`%crun-${taskNum}-Task`, promiseStyle, i),
          resolve
        );
      }, 0);
    });
  }
}

runThousandTask();
