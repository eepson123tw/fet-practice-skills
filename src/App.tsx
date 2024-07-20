import { useEffect } from "react";
import "./main-fn";
import Timer from "./timer.tsx";
import { MutationObserve } from "./mutationObserve.tsx";
import Container from "./Components/Container.tsx";

enum Group {
  Canvas = "canvas",
  BrowserApi = "browser-api",
  Js = "js-trick",
  Css = "css-trick",
}
// "canvas" | "browser..."
type GroupValue = `${Group}` extends `${infer N extends string}` ? N : never;

interface Link {
  url: string;
  routeName: string;
  group: Group;
}

const links: Link[] = [
  { routeName: "canvas-music", url: "/canvas-music.html", group: Group.Canvas },
  { routeName: "canvas-img", url: "/canvas-img.html", group: Group.Canvas },
  {
    routeName: "canvas-drawer",
    url: "/canvas-drawer.html",
    group: Group.Canvas,
  },
  {
    routeName: "clipboard-api",
    url: "/clipboard-api.html",
    group: Group.BrowserApi,
  },
  {
    routeName: "eye-dropper",
    url: "/eye-dropper.html",
    group: Group.BrowserApi,
  },
  { routeName: "media-query", url: "/media-query", group: Group.BrowserApi },
  { routeName: "read-file", url: "/read-file", group: Group.BrowserApi },
  { routeName: "coffee-cup", url: "/coffee-cup", group: Group.Css },
  { routeName: "bubble-up", url: "/bubble-up", group: Group.Css },
  { routeName: "box-reflect", url: "/box-reflect", group: Group.Css },
  { routeName: "btn-collapse", url: "/btn-collapse", group: Group.Css },
  { routeName: "text-title", url: "/text-title", group: Group.Css },
  { routeName: "hover-effect", url: "/hover-effect", group: Group.Css },
  { routeName: "text-empty", url: "/text-empty", group: Group.Css },
  { routeName: "image-size", url: "/img-size", group: Group.Css },
  { routeName: "aspect-ratio", url: "/aspect-ratio", group: Group.Css },
  { routeName: "rotate-img", url: "/rotate-img", group: Group.Css },
  { routeName: "text-eraser", url: "/text-eraser", group: Group.Css },
  { routeName: "traffic-light", url: "/traffic-light", group: Group.Js },
  {
    routeName: "run-thousand-task",
    url: "/run-thousand-task",
    group: Group.Js,
  },
  { routeName: "frame-img", url: "/frame-img", group: Group.Js },
  { routeName: "color-thief", url: "/color-thief", group: Group.Js },
  { routeName: "2048", url: "/2048", group: Group.Js },
  { routeName: "color-thief", url: "/color-thief", group: Group.Js },
  { routeName: "text-track", url: "/text-track", group: Group.Js },
  { routeName: "hoc-task", url: "/hoc-run-task", group: Group.Js },
  {
    routeName: "broadcastChannel-card",
    url: "/broadcastChannel-card",
    group: Group.Js,
  },
];

function isValidKey(key: string): key is GroupValue {
  return Object.values(Group).some((enumValue) => enumValue === key);
}

const groupBy = (arr: Link[], key: keyof Link) => {
  return arr.reduce((acc, cur) => {
    const groupKey = cur[key];
    if (isValidKey(groupKey)) {
      (acc[groupKey] = acc[groupKey] || []).push(cur);
    }
    return acc;
  }, {} as Record<GroupValue, Link[]>);
};

console.log(groupBy(links, "group"), isValidKey("css-trick"));

function Link() {
  // if is build change the link to under '/'
  const urlHead = import.meta.env.MODE === "production" ? "." : "/fet-trick";
  return (
    <>
      <h2>Web Api</h2>
      {Object.keys(groupBy(links, "group")).map((group) => {
        return (
          <div key={group} className="link-group">
            <h3 className="link-title">{group}</h3>
            <ul>
              {groupBy(links, "group")[group as GroupValue].map((link) => {
                return (
                  <li key={link.routeName}>
                    <a className="link" href={`${urlHead}${link.url}`}>
                      {link.routeName}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
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
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
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
      <meta name="description" content="test react 19 meta" />
      <div id="app">
        <Canvas></Canvas>
        <Timer></Timer>
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
