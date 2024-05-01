function toZnTw(value: string): string {
  const zhMap = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const unit = ["", "十", "百", "千"];
  let res = "";
  for (let i = 0; i < value.length; i++) {
    const n = zhMap[value[i]];
    let u = unit[value.length - i - 1];
    if (n === "零") {
      u = "";
    }
    res += n + u;
  }
  res = handleZero(res);
  return res;
}

function handleZero(value: string) {
  return value.replace(/零+/g, "零").replace(/零$/, "");
}

function twToNum(num: number): string {
  const zhlist = num
    .toString()
    .replace(/\d{1,4}/g, ",$&")
    .split(",")
    .filter(Boolean);
  let zhWord = "";
  for (let i = 0; i < zhlist.length; i++) {
    const unit = ["", "萬", "億", "兆"];
    const u = unit[zhlist.length - i - 1];
    const c = toZnTw(zhlist[i]);
    if (c === "") {
      zhWord += "零";
      continue;
    }
    zhWord += c + u;
    zhWord = handleZero(zhWord);
  }
  return zhWord;
}

twToNum(123412341234);
