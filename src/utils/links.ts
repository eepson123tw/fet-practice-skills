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

interface Link {
  url: string;
  routeName: string;
  group: Group;
}

export const links: Link[] = [
  { routeName: "canvas-music", url: "/canvas-music.html", group: Group.Canvas },
  { routeName: "canvas-img", url: "/canvas-img.html", group: Group.Canvas },
  { routeName: "draw-dot", url: "/draw-dot", group: Group.Canvas },
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
  { routeName: "page-api", url: "/page-api", group: Group.BrowserApi },
  {
    routeName: "rounded-highlight",
    url: "/rounded-highlight",
    group: Group.Css,
  },
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
  { routeName: "css-selector", url: "/css-selector", group: Group.Css },
  { routeName: "dot-loading", url: "/dot-loading", group: Group.Css },
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
  { routeName: "drag-api", url: "/drag-api", group: Group.Js },
  { routeName: "visible-list", url: "/visible-list", group: Group.Js },
  { routeName: "list-animation", url: "/list-animation", group: Group.Js },
  {
    routeName: "async-function-call",
    url: "/async-function-call",
    group: Group.Js,
  },
];

export function isValidKey(key: string): key is GroupValue {
  return Object.values(Group).some((enumValue) => enumValue === key);
}

export const groupBy = (arr: Link[], key: keyof Link) => {
  return arr.reduce((acc, cur) => {
    const groupKey = cur[key];
    if (isValidKey(groupKey)) {
      (acc[groupKey] = acc[groupKey] || []).push(cur);
    }
    return acc;
  }, {} as Record<GroupValue, Link[]>);
};
