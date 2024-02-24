// @ts-nocheck
const audio = document.querySelector("audio");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function drawStarburst(buffer, numLines, maxLineLength) {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 繪製圓心
  const radius = 50; // 圓的半徑大小
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)"; // 可以根據需要調整圓的顏色和透明度
  ctx.fill();

  for (let i = 0; i < numLines; i++) {
    // Use the buffer data for the line length
    const value = buffer[i];
    const percent = value / 255;
    const lineLength = percent * maxLineLength;

    const angle = ((Math.PI * 2) / numLines) * i;
    const color = `hsl(${(i / numLines) * 360}, 100%, 50%)`;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(angle) * lineLength,
      centerY + Math.sin(angle) * lineLength
    );
    ctx.strokeStyle = color;
    ctx.stroke();
  }
}

let init = false;
let buffer;
let analyser;
audio.onplay = function () {
  if (init) return;
  init = true;

  const audioCtx = new AudioContext();
  const source = audioCtx.createMediaElementSource(audio);
  analyser = audioCtx.createAnalyser();

  // Use a smaller FFT size for better time resolution
  analyser.fftSize = 1024;
  buffer = new Uint8Array(analyser.frequencyBinCount);

  source.connect(analyser);
  analyser.connect(audioCtx.destination); // Connect the analyser to the destination
};

function update() {
  window.requestAnimationFrame(update);
  if (!init) return;
  analyser.getByteFrequencyData(buffer);
  // Get the frequency data and pass it to the drawStarburst function
  const offset = Math.floor((buffer.length * 2) / 3);
  const data = new Array(offset * 2);
  for (let i = 0; i < offset; i++) {
    data[i] = data[data.length - i - 1] = buffer[i];
  }

  drawStarburst(data, data.length, canvas.height / 2);
}

// Start the animation
update();
