export enum Group {
  Canvas = "canvas",
  BrowserApi = "browser-api",
  Js = "js-trick",
  Css = "css-trick",
}
// "canvas" | "browser..."etc
export type GroupValue = `${Group}` extends `${infer N extends string}`
  ? N
  : never;

export interface Link {
  url: string;
  routeName: string;
  group: Group;
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
];
export const browserApiGroups: Array<Link> = [
  {
    routeName: "clipboard-api",
    url: "/browser/clipboard-api",
    group: Group.BrowserApi,
  },
  {
    routeName: "eye-dropper",
    url: "/browser/eye-dropper",
    group: Group.BrowserApi,
  },
  {
    routeName: "media-query",
    url: "/browser/media-query",
    group: Group.BrowserApi,
  },
  {
    routeName: "read-file",
    url: "/browser/read-file",
    group: Group.BrowserApi,
  },
  { routeName: "page-api", url: "/browser/page-api", group: Group.BrowserApi },
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
  { routeName: "color-thief", url: "/js/color-thief", group: Group.Js },
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
    routeName: "intersection-observer-two",
    url: "/js/intersection-observer-two",
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
  { routeName: "text-empty", url: "/css/text-empty", group: Group.Css },
  { routeName: "image-size", url: "/css/img-size", group: Group.Css },
  { routeName: "aspect-ratio", url: "/css/aspect-ratio", group: Group.Css },
  { routeName: "rotate-img", url: "/css/rotate-img", group: Group.Css },
  { routeName: "text-eraser", url: "/css/text-eraser", group: Group.Css },
  { routeName: "css-selector", url: "/css/css-selector", group: Group.Css },
  { routeName: "dot-loading", url: "/css/dot-loading", group: Group.Css },
  { routeName: "svg-animation", url: "/css/svg-animation", group: Group.Css },
];