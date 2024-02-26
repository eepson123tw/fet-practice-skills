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
