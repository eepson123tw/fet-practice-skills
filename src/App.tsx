import { useEffect } from "react";
import "./main-fn";
import Timer from "./timer.tsx";

interface Link {
  url: string;
  routeName: string;
}

const links: Link[] = [
  { routeName: "canvas-music", url: "/canvas-music.html" },
  { routeName: "clipboard-api", url: "/clipboard-api.html" },
  { routeName: "canvas-img", url: "/canvas-img.html" },
  { routeName: "eye-dropper", url: "/eye-dropper.html" },
  { routeName: "media-query", url: "/media-query" },
  { routeName: "read-file", url: "/read-file" },
  { routeName: "traffic-light", url: "/traffic-light" },
  { routeName: "coffee-cup", url: "/coffee-cup" },
  { routeName: "bubble-up", url: "/bubble-up" },
  { routeName: "box-reflect", url: "/box-reflect" },
  { routeName: "text-track", url: "/text-track" },
  { routeName: "btn-collapse", url: "/btn-collapse" },
  { routeName: "text-title", url: "/text-title" },
];

function Link() {
  // if is build change the link to under '/'
  const urlHead = import.meta.env.MODE === "production" ? "." : "/fet-trick";
  return (
    <>
      <div className="link">
        <h2>Web Api</h2>
        <ul>
          {links.map((link) => {
            return (
              <li key={link.routeName}>
                <a href={`${urlHead}${link.url}`}>{link.routeName}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

function Canvas() {
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
    // draw a row of text
    const draw = () => {
      ctx.fillStyle = "rgba(240, 240, 240, 0.1)";
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

    setInterval(() => {
      draw();
    }, 30);
    draw();
  }, []);

  return (
    <>
      <canvas id="canvas" className="canvas"></canvas>
    </>
  );
}

function App() {
  return (
    <>
      <div id="app">
        <Canvas></Canvas>
        <Timer></Timer>
        <Link></Link>
      </div>
    </>
  );
}

export default App;
