import { SidebarTrigger } from "@components/ui/sidebar";
import { AppSidebar } from "@components/app-sidebar";

import React, { useEffect } from "react";
import { useTheme } from "./hook/useTheme.ts";
import { useAppContext } from "./store/AppContext.tsx";

import { useSidebar } from "@components/ui/sidebar";
function Canvas({ theme }: { theme: "light" | "dark" | "os" }) {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const { urlHash } = useAppContext();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const cvs = document.getElementById("canvas") as HTMLCanvasElement;
    const main = document.querySelector("main") as HTMLElement;
    const mainHeight = main.clientHeight;
    const width = window.innerWidth * devicePixelRatio;
    const height = (mainHeight || window.innerHeight) * devicePixelRatio;

    cvs.width = width;
    cvs.height = height;

    const ctx = cvs.getContext("2d") as CanvasRenderingContext2D;

    const fontSize = 15 * devicePixelRatio;

    const randomColor = () => {
      const fontColors = [
        "#33B5E5",
        "#AA66CC",
        "#99CC00",
        "#FFBB33",
        "#FF4444",
        "#0099CC",
        "#9933CC",
        "#669900",
        "#FF8800",
        "#CC0000",
      ];
      return fontColors[Math.floor(Math.random() * fontColors.length)];
    };

    const randomText = () => {
      const str = "Frontend Practice Skills";
      return str[Math.floor(Math.random() * str.length)];
    };
    // columnWidth
    const columnWidth = fontSize;
    const columns = Math.floor(width / columnWidth);
    // each column next text y position
    const nextChar = new Array(columns).fill(0);

    const draw = () => {
      const bgColor = theme === "dark" ? "rgba(0, 0, 0, 1)" : "#C4D7F2";
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);
      for (let i = 0; i < columns; i++) {
        ctx.fillStyle = randomColor();
        const text = randomText();
        ctx.font = `${fontSize}px Arial`;
        const x = i * columnWidth;
        const s = nextChar[i];
        const y = (s + 1) * fontSize;
        ctx.fillText(text, x, y);
        if (y > height && Math.random() > 0.975) {
          nextChar[i] = 0;
        } else {
          nextChar[i]++;
        }
      }
    };

    const intervalId = setInterval(draw, 30);
    draw();

    return () => {
      clearInterval(intervalId);
    };
  }, [theme, windowWidth, urlHash]);

  return (
    <>
      <canvas id="canvas" className="canvas absolute -z-10 top-0"></canvas>
    </>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const { open, isMobile } = useSidebar();
  const showSideBarIcon = () => {
    if (isMobile || !open) return true;
    if (!isMobile) return false;
    return true;
  };

  return (
    <React.Fragment>
      <AppSidebar theme={theme} setTheme={setTheme} />
      <main className="w-full relative overflow-hidden">
        {showSideBarIcon() && (
          <SidebarTrigger
            type="button"
            className="fixed z-20 top-1/2 translate-x-2 bg-white outline outline-gray-400 rounded-full p-2"
          />
        )}
        {children}
        <Canvas theme={theme}></Canvas>
      </main>
    </React.Fragment>
  );
}
