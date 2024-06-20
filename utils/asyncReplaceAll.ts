// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface String {
  asyncReplaceAll(
    regexp: RegExp | string,
    asyncFn: (res: string) => Promise<string>
  ): Promise<string>;
}

const getName = (res: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`name${res}`);
    }, 1000);
  });
};

String.prototype.asyncReplaceAll = async function (
  this: string, // 明確指定 this 的類型為 string
  regexp: RegExp | string,
  asyncFn: (res: string) => Promise<string>
): Promise<string> {
  if (typeof asyncFn === "string") {
    return this.replace(regexp, asyncFn);
  }
  if (typeof asyncFn !== "function") {
    throw new TypeError("asyncFn must be a function");
  }

  let reg: RegExp;
  if (typeof regexp === "string") {
    reg = new RegExp(regexp.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&"), "g");
  } else if (regexp instanceof RegExp) {
    if (!regexp.global) {
      throw new TypeError("RegExp must have the global flag");
    }
    reg = new RegExp(regexp);
  } else {
    throw new TypeError("regexp must be a string or RegExp");
  }

  const result: Array<string | Promise<string>> = [];
  let match;
  let lastIdx = 0;

  while ((match = reg.exec(this)) !== null) {
    const item = asyncFn(match[0]);
    const prefix = this.slice(lastIdx, match.index);
    lastIdx = match.index + match[0].length;
    result.push(prefix);
    result.push(item);
  }
  result.push(this.slice(lastIdx));

  const response = await Promise.all(result);
  return response.join("");
};

const template = "1_2-3-4_5-6-7_8-9-0";

(async () => {
  const res = await template.asyncReplaceAll(/\d+/g, (m) => getName(m));
  console.log(res);
})();
