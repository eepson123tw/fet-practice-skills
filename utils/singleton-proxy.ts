/** try to crtate a singleton proxy for a class
 * 1. create a class with a private constructor
 * 2. create a static property to store the instance
 * 3. create a static method to get the instance
 * 4. create a static method to set the instance
 * 5. create a static method to delete the instance
 */

const singletonProxy = (target: any) => {
  let ins: any;
  const proxy = new Proxy(target, {
    construct: (target, args) => {
      if (!ins) {
        ins = new target(...args);
        return ins;
      } else {
        console.warn(
          "This class is a singleton, please use getInstance method to get the instance."
        );
      }
      return ins;
    },
  });
  target.prototype.constructor = proxy;
  return proxy;
};

export default singletonProxy;
