/**
 * 	* Compare rule
 *  1. if a == b , compare with value
 * 	2. if a == b, any side is NaN, return false
 * 	3. if a == b, any side is null or undefined, only compare with self or each other will return true
 * 	4. if a,b are original type, will transform to number to compare
 * 	5. if a,b one side is object, convert to original type to compare
 *
 * 	how to let object to convert to original type
 * 	1. if object has [symbol.toPrimitive] method, call it , if can't convert to number, throw error
 * 	2. if object has valueOf method, call it, if can't convert to number, to to step 3
 * 	3. if object has toString method, call it, if can't convert to number, throw error
 *
 */

const a: unknown = {
  c: 1,
  valueOf: function () {
    return this.c++;
  },
};

if (a == 1 && a == 2 && a == 3) {
  console.log("a==1 && a ==2 && a==3");
}
