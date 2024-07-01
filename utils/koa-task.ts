type Task = (next: () => void) => Promise<void> | void;

function TaskPro() {
  let taskQueue: Task[] = [];
  let currentTaskIndex = 0;
  let isRunning = false;

  function addTask(task: Task) {
    taskQueue.push(task);
  }

  function run() {
    if (isRunning) return;
    isRunning = true;
    _runTask();
  }
  async function _runTask(this: unknown) {
    if (currentTaskIndex >= taskQueue.length) {
      isRunning = false;
      currentTaskIndex = 0;
      taskQueue = [];
      return;
    }
    const task = taskQueue[currentTaskIndex];
    const i = currentTaskIndex;
    await task(_next.bind(this));
    const j = currentTaskIndex;
    if (i === j) {
      _next();
    }
  }

  function _next() {
    currentTaskIndex++;
    _runTask();
  }

  return {
    addTask,
    run,
  };
}

const taskFlow = TaskPro();

taskFlow.addTask(async (next) => {
  console.log("task1 start");
  await next();
  console.log("task1 end");
});

taskFlow.addTask(() => {
  console.log("task2 start");
});

taskFlow.addTask(() => {
  console.log("task3 start");
});

taskFlow.run();
