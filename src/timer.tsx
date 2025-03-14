// todo : implement timer also can let performance more better
// maybe can use fragment to do it
import { useEffect } from "react";
import "./assets/timer.css";

export default function Timer() {
  useEffect(() => {
    // const timer = document.querySelector("#timer");
    // const second = document.querySelector(".second");
    const beforeSecondsTop = document.querySelector(
      ".card-before-top",
    ) as HTMLDivElement;
    const beforeSecondsBottom = document.querySelector(
      ".card-before-bottom",
    ) as HTMLDivElement;
    const afterSecondsTop = document.querySelector(
      ".card-after-top",
    ) as HTMLDivElement;
    const afterSecondsBottom = document.querySelector(
      ".card-after-bottom",
    ) as HTMLDivElement;

    let lastSecond = -1; // 初始化為-1，確保第一次更新時觸發動畫

    function updateTimer() {
      const currentTime = new Date();
      const seconds = currentTime.getSeconds();
      // 只有在秒數改變時才更新卡片和觸發動畫
      if (lastSecond !== seconds) {
        lastSecond = seconds; // 更新最後的秒數記錄
        const curSeconds = seconds < 10 ? `0${seconds}` : seconds;
        const nextSeconds =
          seconds === 59
            ? "00"
            : seconds + 1 < 10
              ? `0${seconds + 1}`
              : seconds + 1;

        if (
          beforeSecondsTop &&
          beforeSecondsBottom &&
          afterSecondsTop &&
          afterSecondsBottom
        ) {
          // 更新卡片上的秒數
          beforeSecondsTop.innerHTML = curSeconds.toString();
          beforeSecondsBottom.innerHTML = curSeconds.toString();
          afterSecondsTop.innerHTML = nextSeconds.toString();
          afterSecondsBottom.innerHTML = nextSeconds.toString();

          // 觸發翻頁動畫
          beforeSecondsBottom.classList.add("active");
          afterSecondsTop.classList.add("active");

          // 設定一個延時，以便翻頁動畫完成後再次切換狀態，為下一次翻頁做準備
          setTimeout(() => {
            beforeSecondsBottom.classList.remove("active");
            afterSecondsTop.classList.remove("active");
            beforeSecondsTop.innerHTML = nextSeconds.toString();
            beforeSecondsBottom.innerHTML = nextSeconds.toString();
          }, 300); // 延時與 CSS 中的過渡時間相匹配
        }
      }

      // 繼續動畫循環
      window.requestAnimationFrame(updateTimer);
    }

    updateTimer();
  });

  return (
    <>
      <div id="timer">
        <div className="second card-container">
          <div className="card card-before-top">1</div>
          <div className="card card-before-bottom">1</div>
          <div className="card card-after-top">2</div>
          <div className="card card-after-bottom">2</div>
        </div>
      </div>
    </>
  );
}
