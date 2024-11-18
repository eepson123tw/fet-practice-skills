export enum Group {
  Canvas = "canvas",
  Browser = "browser",
  Js = "js-trick",
  Css = "css-trick",
}
// "canvas" | "browser..."etc
export type GroupValue = `${Group}` extends `${infer N extends string}`
  ? N
  : never;

export type GroupKey = Lowercase<keyof typeof Group>;

export interface Link {
  routeName: string;
  url: `/${GroupKey}/${Link['routeName']}`;
  group: Group;
  cover?: string;
  description?: string;
}

export const canvasGroups: Array<Link> = [
  {
    routeName: "canvas-music",
    url: "/canvas/canvas-music",
    group: Group.Canvas,
  },
  {
    routeName: "canvas-img",
    url: "/canvas/canvas-img",
    group: Group.Canvas,
  },
  { routeName: "draw-dot", url: "/canvas/draw-dot", group: Group.Canvas },
  {
    routeName: "canvas-drawer",
    url: "/canvas/canvas-drawer",
    group: Group.Canvas,
  },
  {
    routeName: "canvas-effect",
    url: "/canvas/canvas-effect",
    group: Group.Canvas,
  },
  {
    routeName: "canvas-particle",
    url: "/canvas/canvas-particle",
    group: Group.Canvas,
  },
  {
    routeName: "canvas-lyrics-player",
    url: "/canvas/canvas-lyrics-player",
    group: Group.Canvas,
  },

  {
    routeName: "canvas-flow-particles",
    url: "/canvas/canvas-flow-particles",
    group: Group.Canvas,
  },
];
export const browserApiGroups: Array<Link> = [
  {
    routeName: "clipboard-api",
    url: "/browser/clipboard-api",
    group: Group.Browser,
  },
  {
    routeName: "eye-dropper",
    url: "/browser/eye-dropper",
    group: Group.Browser,
  },
  {
    routeName: "media-query",
    url: "/browser/media-query",
    group: Group.Browser,
  },
  {
    routeName: "read-file",
    url: "/browser/read-file",
    group: Group.Browser,
  },
  { routeName: "page-api", url: "/browser/page-api", group: Group.Browser },
    {
    routeName:"dom-parser",
    url:"/js/dom-parser",
    group:Group.Browser
  }
];
export const jsGroups: Array<Link> = [
  { routeName: "traffic-light", url: "/js/traffic-light", group: Group.Js },
  {
    routeName: "run-thousand-task",
    url: "/js/run-thousand-task",
    group: Group.Js,
  },
  { routeName: "frame-img", url: "/js/frame-img", group: Group.Js },
  { routeName: "color-thief", url: "/js/color-thief", group: Group.Js },
  { routeName: "2048", url: "/js/2048", group: Group.Js },
  { routeName: "text-track", url: "/js/text-track", group: Group.Js },
  { routeName: "hoc-task", url: "/js/hoc-run-task", group: Group.Js },
  {
    routeName: "broadcastChannel-card",
    url: "/js/broadcastChannel-card",
    group: Group.Js,
  },
  { routeName: "drag-api", url: "/js/drag-api", group: Group.Js },
  { routeName: "visible-list", url: "/js/visible-list", group: Group.Js },
  { routeName: "list-animation", url: "/js/list-animation", group: Group.Js },
  {
    routeName: "async-function-call",
    url: "/js/async-function-call",
    group: Group.Js,
  },
  {
    routeName: "intersection-observer-one",
    url: "/js/intersection-observer-one",
    group: Group.Js,
  },
  {
    routeName: "intersection-observer-autoplay",
    url: "/js/intersection-observer-autoplay",
    group: Group.Js,
  },
  {
    routeName: "animation-api",
    url: "/js/animation-api",
    group: Group.Js,
  },
  {
    routeName: "canvas-draw-tree",
    url: "/js/canvas-draw-tree",
    group: Group.Js,
  },
  {
    routeName: "gsap-animation",
    url: "/js/gsap-animation",
    group: Group.Js,
  },
  {
    routeName: "waterfall-grid",
    url: "/js/waterfall-grid",
    group: Group.Js,
  },
  {
    routeName: "mouse-hover-effect",
    url: "/js/mouse-hover-effect",
    group: Group.Js,
  },
  {
    routeName: "proxy-reflect-api",
    url: "/js/proxy-reflect-api",
    group: Group.Js,
  },
  {
    routeName: "img-split-hover",
    url: "/js/img-split-hover",
    group: Group.Js,
  },
  {
    routeName: "flip-animation",
    url: "/js/flip-animation",
    group: Group.Js,
  },
  {
    routeName: "screen-capture",
    url: "/js/screen-capture",
    group: Group.Js,
  },
  {
    routeName: "token-flash",
    url: "/js/token-flash",
    group: Group.Js,
  },
  {
    routeName: "carousel",
    url: "/js/carousel",
    group: Group.Js,
  },
];
export const cssGroups: Array<Link> = [
  {
    routeName: "rounded-highlight",
    url: "/css/rounded-highlight",
    group: Group.Css,
  },
  { routeName: "coffee-cup", url: "/css/coffee-cup", group: Group.Css },
  { routeName: "bubble-up", url: "/css/bubble-up", group: Group.Css },
  { routeName: "box-reflect", url: "/css/box-reflect", group: Group.Css },
  { routeName: "btn-collapse", url: "/css/btn-collapse", group: Group.Css },
  { routeName: "text-title", url: "/css/text-title", group: Group.Css },
  { routeName: "hover-effect", url: "/css/hover-effect", group: Group.Css },
  {
    routeName: "hover-effect-edge",
    url: "/css/hover-effect-edge",
    group: Group.Css,
  },
  { routeName: "text-empty", url: "/css/text-empty", group: Group.Css },
  { routeName: "image-size", url: "/css/image-size", group: Group.Css },
  { routeName: "aspect-ratio", url: "/css/aspect-ratio", group: Group.Css },
  { routeName: "rotate-img", url: "/css/rotate-img", group: Group.Css },
  { routeName: "text-eraser", url: "/css/text-eraser", group: Group.Css },
  { routeName: "css-selector", url: "/css/css-selector", group: Group.Css },
  { routeName: "dot-loading", url: "/css/dot-loading", group: Group.Css },
  { routeName: "svg-animation", url: "/css/svg-animation", group: Group.Css },
  {
    routeName: "poem-text-order",
    url: "/css/poem-text-order",
    group: Group.Css,
  },
  {
    routeName: "rwd-width-height",
    url: "/css/rwd-width-height",
    group: Group.Css,
  },
  {
    routeName: "noise-img",
    url: "/css/noise-img",
    group: Group.Css,
  },
  {
    routeName: "houdini-apis",
    url: "/css/houdini-apis",
    group: Group.Css,
  },
    {
    routeName: "hover-padding",
    url: "/css/hover-padding",
    group: Group.Css,
  },
];
