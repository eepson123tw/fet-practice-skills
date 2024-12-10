// const file = document.getElementById("file");

// function captureFrame(vdoFile, time = 0) {
//   return new Promise((resolve) => {
//     const vdo = document.createElement("video");
//     vdo.currentTime = time;
//     vdo.autoplay = true;
//     vdo.muted = true;
//     vdo.src = URL.createObjectURL(vdoFile);
//     vdo.oncanplay = () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = vdo.videoWidth;
//       canvas.height = vdo.videoHeight;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(vdo, 0, 0, canvas.width, canvas.height);
//       canvas.toBlob((blob) => {
//         const url = URL.createObjectURL(blob);
//         resolve({
//           blob,
//           url,
//         });
//       });
//     };
//   });
// }
// function previewImage(url) {
//   const img = document.createElement("img");
//   img.src = url;
//   document.body.appendChild(img);
// }

// file.onchange = async (e) => {
//   const file = e.target.files[0];
//   console.log(file);
//   const res = await captureFrame(file, 1);
//   previewImage(res.url);
// };

// async function loadAndDisplayVideo() {
//   const video1 = new URL("textone.mp4", import.meta.url.replace("utils/", ""))
//     .href;
//   const videoSrc = video1; // Ensure the path is correct based on your folder structure
//   console.log(videoSrc);
//   const res = await captureFrame(videoSrc, 1); // Capture frame at 1 second
//   previewImage(res.url);
// }

// window.onload = loadAndDisplayVideo;

window.onload = async function () {
  // 正确地创建 URL 并进行类型断言
  const videoSrc = new URL("textone.mp4", import.meta.url.replace("utils/", ""))
    .href;

  // 获取视频元素并进行类型断言
  const videoElement = document.getElementById(
    "videoElement",
  ) as HTMLVideoElement;
  videoElement.src = videoSrc;

  // 确保 videoElement 已正确断言
  if (videoElement) {
    const res = await captureFrame(videoElement, 1);
    const frameElement = document.getElementById("frame") as HTMLImageElement;

    // 检查 frameElement 是否存在
    if (frameElement) {
      frameElement.src = res.url;
    } else {
      console.error("Frame element not found!");
    }
  } else {
    console.error("Video element not found!");
  }
};

function captureFrame(
  videoElement: HTMLVideoElement,
  time: number = 0,
): Promise<{ blob: Blob; url: string }> {
  return new Promise((resolve, reject) => {
    videoElement.currentTime = time;
    videoElement.addEventListener(
      "canplay",
      function () {
        const canvas = document.createElement("canvas");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            resolve({ blob, url });
          } else {
            reject(new Error("Failed to convert canvas to blob"));
          }
        }, "image/jpeg");
      },
      { once: true },
    );
  });
}
