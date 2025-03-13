// Worker internal state
let taskInProgress = false;
let workerState = {
  messageCount: 0,
  startTime: Date.now(),
};

// Handle messages from the main thread
self.onmessage = function (e) {
  const data = e.data;

  // Log message received
  workerState.messageCount++;

  // Check message type and process accordingly
  switch (data.type) {
    case "message":
      // Simple message echo with timestamp
      self.postMessage({
        type: "message",
        originalText: data.text,
        processedText: data.text.toUpperCase(),
        timestamp: new Date().toISOString(),
      });
      break;

    case "calculate-primes":
      // Start a computationally intensive task
      calculatePrimes(data.count);
      break;

    case "intensive-task":
      // Run an intensive task that would normally block the UI
      runIntensiveTask();
      break;

    case "ping":
      // Simple ping to check worker status
      self.postMessage({
        type: "pong",
        messageCount: workerState.messageCount,
        uptime: (Date.now() - workerState.startTime) / 1000,
      });
      break;

    default:
      // Unknown message type
      self.postMessage({
        type: "error",
        message: "Unknown message type: " + data.type,
      });
  }
};

// Error handler
self.onerror = function (error) {
  self.postMessage({
    type: "error",
    message: error.message,
    filename: error.filename,
    lineno: error.lineno,
  });
};

// Calculate prime numbers up to a given count
function calculatePrimes(maxCount) {
  if (taskInProgress) {
    self.postMessage({
      type: "error",
      message: "A task is already in progress",
    });
    return;
  }

  taskInProgress = true;
  const primes = [];
  let count = 0;
  let num = 2;

  self.postMessage({
    type: "task-start",
    task: "calculate-primes",
    maxCount: maxCount,
  });

  const startTime = performance.now();

  // Find prime numbers until we reach the requested count
  while (count < maxCount) {
    if (isPrime(num)) {
      primes.push(num);
      count++;

      // Report progress at regular intervals
      if (count % (maxCount / 100) < 1) {
        const progress = Math.round((count / maxCount) * 100);
        self.postMessage({
          type: "progress",
          percentage: progress,
          current: count,
          total: maxCount,
        });
      }
    }
    num++;
  }

  const endTime = performance.now();

  self.postMessage({
    type: "task-complete",
    task: "calculate-primes",
    result: {
      count: primes.length,
      first10: primes.slice(0, 10),
      last10: primes.slice(-10),
      timeMs: endTime - startTime,
    },
  });

  taskInProgress = false;
}

// Check if a number is prime
function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }
  return true;
}

// Simulate an intensive task that would block the UI if run on main thread
function runIntensiveTask() {
  if (taskInProgress) {
    self.postMessage({
      type: "error",
      message: "A task is already in progress",
    });
    return;
  }

  taskInProgress = true;

  self.postMessage({
    type: "task-start",
    task: "intensive-task",
  });

  const startTime = performance.now();

  // Perform a CPU-intensive operation
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += Math.sqrt(i) * Math.cos(i);

    // Report progress occasionally
    if (i % 10000000 === 0) {
      const progress = Math.round((i / 1000000000) * 100);
      self.postMessage({
        type: "progress",
        percentage: progress,
        current: i,
        total: 1000000000,
      });
    }
  }

  const endTime = performance.now();

  self.postMessage({
    type: "task-complete",
    task: "intensive-task",
    result: {
      computedValue: result,
      timeMs: endTime - startTime,
    },
  });

  taskInProgress = false;
}
