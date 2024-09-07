import React, { useEffect, useLayoutEffect, useRef } from "react";
import "./main-fn";

import Timer from "./timer.tsx";
import { MutationObserve } from "./mutationObserve.tsx";
import Container from "./Components/Container.tsx";
import { links, groupBy, isValidKey } from "./utils/links.ts";
import { useTheme } from "./hook/useTheme.ts";
function Link() {
  // if is build change the link to under '/'
  const urlHead = import.meta.env.MODE === "production" ? "." : "/fet-trick";
  const urlFilter = (url: string) => {
    const filterTxts = ["/js/", "/css/", "/browser/", "/canvas/"];
    let resFilterUrl = url;
    filterTxts.forEach((filter) => {
      const regex = new RegExp(`^${filter}`, "gi"); // Match the filter only at the start of the string
      resFilterUrl = resFilterUrl.replace(regex, "/"); // Remove the filter from the beginning
    });

    return import.meta.env.MODE === "production" ? resFilterUrl + ".html" : url;
  };

  const linkList = (group: string) => {
    if (!isValidKey(group)) {
      return "";
    }
    return (
      <ul>
        {groupBy(links, "group")[group].map((link) => {
          return (
            <li key={link.routeName}>
              <a className="link" href={`${urlHead}${urlFilter(link.url)}`}>
                {link.routeName}
              </a>
            </li>
          );
        })}
      </ul>
    );
  };
  return (
    <>
      <h2>Web Api</h2>
      {Object.keys(groupBy(links, "group")).map((group) => {
        console.log(linkList(group));
        return (
          <div key={group} className="link-group">
            <h3 className="link-title">{group}</h3>
            {linkList(group)}
          </div>
        );
      })}
    </>
  );
}

function Canvas({ theme }: { theme: "light" | "dark" | "os" }) {
  useEffect(() => {
    const cvs = document.getElementById("canvas") as HTMLCanvasElement;
    const width = window.innerWidth * devicePixelRatio;
    const height = window.innerHeight * devicePixelRatio;

    cvs.width = width;
    cvs.height = height;

    const ctx = cvs.getContext("2d") as CanvasRenderingContext2D;

    const fontSize = 20 * devicePixelRatio;

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
      const str = "My Code Base Test";
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
  }, [theme]);

  return (
    <>
      <canvas id="canvas" className="canvas"></canvas>
    </>
  );
}

function SystemChangeColor({
  theme,
  setTheme,
}: {
  theme: "light" | "dark" | "os";
  setTheme: (theme: "light" | "dark" | "os") => void;
}) {
  const selectRef = useRef<HTMLSelectElement>(null);
  useLayoutEffect(() => {
    if (selectRef.current && theme === "os") {
      selectRef.current.value = theme;
    }
  }, [theme]);

  return (
    <div className="theme-select">
      <select
        ref={selectRef}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setTheme(e.target.value as "light" | "dark" | "os")
        }
      >
        <option value="light">light</option>
        <option value="dark">dark</option>
        <option value="os">os</option>
      </select>
    </div>
  );
}

function App() {
  const { theme, setTheme } = useTheme();
  return (
    <>
      <meta name="description" content="test react 19 meta" />
      <div id="app">
        <Canvas theme={theme}></Canvas>
        <Timer></Timer>
        <SystemChangeColor
          theme={theme}
          setTheme={setTheme}
        ></SystemChangeColor>
        <Link></Link>
        <div style={{ display: "flex" }}>
          <Container title="React 19 Info:">
            <ul>
              <li>useFormStatus</li>
              <li>use</li>
              <li>React complier useMemo or useCallback to optimize</li>
              <li>Preload Preinit</li>
              <li>react meta config</li>
            </ul>
          </Container>
          <Container title="浮水印">
            <MutationObserve text="浮水印" gap={15} fontSize={14}>
              <div>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Dolores quasi tempora modi, quo cupiditate incidunt suscipit
                molestias
              </div>
            </MutationObserve>
          </Container>
        </div>
      </div>
    </>
  );
}

export default App;
