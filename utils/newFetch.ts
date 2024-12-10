export const consoleStyle =
  "background-color: #13AA13; color: white; padding: 5px;";
export const promiseStyle =
  "background-color: red; color: white; padding: 5px;";

/**
 * this is react suspense core logic
 * we change the fetch function to a new fetch function
 * and we can control the fetch status
 * to realize the response status
 */

function getUser() {
  return fetch("https://jsonplaceholder.typicode.com/todos/1");
}
function m1() {
  const user = getUser();
  return user;
}

function m2() {
  const user = m1();
  return user;
}

function m3() {
  const user = m2();
  return user;
}

function main() {
  const user = m3();
  return user;
}

function runNewFetch(func: () => void) {
  // renew fetch
  const oldFetch = window.fetch;
  const cache: {
    status: "pending" | "fulfilled" | "rejected";
    value: Response | Error | undefined;
  } = {
    status: "pending",
    value: undefined,
  };
  function newFetch(...args: Parameters<typeof fetch>) {
    if (cache.status === "fulfilled" && cache.value !== undefined) {
      return cache.value;
    } else if (cache.status === "rejected") {
      throw new Error("fetch error");
    }
    // no cache use old fetch to send request
    const p = oldFetch(...args)
      .then((data) => {
        cache.status = "fulfilled";
        cache.value = data;
      })
      .catch((error) => {
        cache.status = "rejected";
        cache.value = error;
      });

    // throw the cache error to let the function catch it
    throw p;
  }
  window.fetch = newFetch as unknown as typeof fetch;
  // run the function
  try {
    console.log(
      "%crunNewFetch",
      consoleStyle,
      "Suspense first run will be blocked",
    );
    func();
  } catch (err) {
    // wait response
    if (err instanceof Promise) {
      err.finally(() => {
        window.fetch = newFetch as unknown as typeof fetch;
        console.log(
          "%crunNewFetch",
          promiseStyle,
          "Suspense second run will be ok",
        );
        func();
        console.log("fetch", cache);
        window.fetch = oldFetch;
      });
    }
  }
  // recover fetch
  window.fetch = oldFetch;
}

runNewFetch(main);
