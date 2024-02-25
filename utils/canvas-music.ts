const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d", {
  willReadFrequently: true,
});
function init() {
  const img = new Image();
  img.onload = () => {
    cvs.width = img.width / 3;
    cvs.height = img.height / 3;
    ctx.drawImage(img, 0, 0, img.width / 3, img.height / 3);
  };
  img.src = "../assets/02.png";
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});

cvs.addEventListener("click", (e) => {
  // 1. 獲取點擊位置資訊
  const x = e.offsetX;
  const y = e.offsetY;
  const imgInfo = ctx.getImageData(0, 0, cvs.width, cvs.height);
  console.log(imgInfo.data); // 4個1組 像素點
  const clickColor = getColor(x, y, imgInfo.data);
  // 2. 改變顏色
  const targetColor = [125, 125, 0, 255];
  changeColor(x, y, imgInfo.data, targetColor, clickColor);
  ctx.putImageData(imgInfo, 0, 0);
});

function changeColor(x, y, imageInfo, targetColor, clickColor) {
  let stack = [];
  stack.push({ x: x, y: y });

  while (stack.length > 0) {
    // 取出栈顶元素
    let point = stack.pop();
    x = point.x;
    y = point.y;

    if (x < 0 || x >= cvs.width || y < 0 || y >= cvs.height) continue;
    const index = pointToIndex(x, y);
    const curColor = [
      imageInfo[index],
      imageInfo[index + 1],
      imageInfo[index + 2],
      imageInfo[index + 3],
    ];

    if (
      diff(clickColor, curColor) > 100 ||
      diff(clickColor, targetColor) === 0
    ) {
      continue;
    }

    imageInfo.set(targetColor, index);

    stack.push({ x: x + 1, y: y });
    stack.push({ x: x - 1, y: y });
    stack.push({ x: x, y: y + 1 });
    stack.push({ x: x, y: y - 1 });
  }
}

function pointToIndex(x, y) {
  return (y * cvs.width + x) * 4;
}

function getColor(x, y, imgInfo) {
  const index = pointToIndex(x, y);
  return [
    imgInfo[index],
    imgInfo[index + 1],
    imgInfo[index + 2],
    imgInfo[index + 3],
  ];
}

function diff(color1, color2) {
  return (
    Math.abs(color1[0] - color2[0]) +
    Math.abs(color1[1] - color2[1]) +
    Math.abs(color1[2] - color2[2]) +
    Math.abs(color1[3] - color2[3])
  );
}
