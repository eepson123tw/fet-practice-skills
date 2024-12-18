export enum Group {
  Canvas = "canvas",
  Browser = "browser",
  Js = "js-trick",
  Css = "css-trick",
  Code = "code",
  Info = "info",
}
// "canvas" | "browser..."etc
export type GroupValue = `${Group}` extends `${infer N extends string}`
  ? N
  : never;

export type GroupKey = Lowercase<keyof typeof Group>;
export interface Link {
  routeName: string;
  url: `/${GroupKey}/${Link["routeName"]}`;
  group: Group;
  cover?: string;
  description?: string;
  folder?: string;
}

export const canvasGroups: Array<Link> = [
  {
    routeName: "canvas-music",
    url: "/canvas/canvas-music",
    group: Group.Canvas,
    description: "Interactive canvas-based music visualizations and tools.",
  },
  {
    routeName: "canvas-img",
    url: "/canvas/canvas-img",
    group: Group.Canvas,
    description: "Image manipulation and rendering using HTML canvas.",
  },
  {
    routeName: "draw-dot",
    url: "/canvas/draw-dot",
    group: Group.Canvas,
    description: "An application to draw and animate dots on a canvas.",
  },
  {
    routeName: "canvas-drawer",
    url: "/canvas/canvas-drawer",
    group: Group.Canvas,
    description: "A simple drawing tool using the canvas element.",
  },
  {
    routeName: "canvas-effect",
    url: "/canvas/canvas-effect",
    group: Group.Canvas,
    description: "Various visual effects created with canvas.",
  },
  {
    routeName: "canvas-particle",
    url: "/canvas/canvas-particle",
    group: Group.Canvas,
    description: "Particle systems and animations using the canvas.",
  },
  {
    routeName: "canvas-lyrics-player",
    url: "/canvas/canvas-lyrics-player",
    group: Group.Canvas,
    description: "A lyrics player with visual effects on canvas.",
  },
  {
    routeName: "canvas-flow-particles",
    url: "/canvas/canvas-flow-particles",
    group: Group.Canvas,
    description: "Flowing particle animations with interactive controls.",
  },
];

export const browserApiGroups: Array<Link> = [
  {
    routeName: "clipboard-api",
    url: "/browser/clipboard-api",
    group: Group.Browser,
    description: "Demonstration of the Clipboard API for copying and pasting.",
  },
  {
    routeName: "eye-dropper",
    url: "/browser/eye-dropper",
    group: Group.Browser,
    description: "Use the EyeDropper API to pick colors from the screen.",
  },
  {
    routeName: "media-query",
    url: "/browser/media-query",
    group: Group.Browser,
    description: "Showcase responsive design using Media Query APIs.",
  },
  {
    routeName: "read-file",
    url: "/browser/read-file",
    group: Group.Browser,
    description: "Read and display files using JavaScript's FileReader API.",
  },
  {
    routeName: "page-api",
    url: "/browser/page-api",
    group: Group.Browser,
    description: "Interact with various web page APIs for dynamic behavior.",
  },
  {
    routeName: "dom-parser",
    url: "/js/dom-parser",
    group: Group.Browser,
    description: "Parse and manipulate DOM content programmatically.",
  },
];

export const jsGroups: Array<Link> = [
  {
    routeName: "traffic-light",
    url: "/js/traffic-light",
    group: Group.Js,
    description: "Simulate a traffic light system with animations.",
  },
  {
    routeName: "run-thousand-task",
    url: "/js/run-thousand-task",
    group: Group.Js,
    description: "Efficiently handle and process a large number of tasks.",
  },
  {
    routeName: "frame-img",
    url: "/js/frame-img",
    group: Group.Js,
    description: "Animate and manipulate image frames dynamically.",
  },
  {
    routeName: "color-thief",
    url: "/js/color-thief",
    group: Group.Js,
    description: "Extract prominent colors from an image.",
  },
  {
    routeName: "2048",
    url: "/js/2048",
    group: Group.Js,
    description: "Implementation of the 2048 game.",
  },
  {
    routeName: "text-track",
    url: "/js/text-track",
    group: Group.Js,
    description: "Work with text tracks and subtitles for media.",
  },
  {
    routeName: "hoc-task",
    url: "/js/hoc-run-task",
    group: Group.Js,
    description: "Demonstrate higher-order component tasks in JavaScript.",
  },
  {
    routeName: "broadcastChannel-card",
    url: "/js/broadcastChannel-card",
    group: Group.Js,
    description: "Communicate across browser tabs using BroadcastChannel.",
  },
  {
    routeName: "drag-api",
    url: "/js/drag-api",
    group: Group.Js,
    description: "Drag and drop functionality with the Drag API.",
  },
  {
    routeName: "visible-list",
    url: "/js/visible-list",
    group: Group.Js,
    description: "Display and manage visible items in a list dynamically.",
  },
  {
    routeName: "list-animation",
    url: "/js/list-animation",
    group: Group.Js,
    description: "Add animations to list items when they change.",
  },
  {
    routeName: "async-function-call",
    url: "/js/async-function-call",
    group: Group.Js,
    description: "Handle asynchronous function calls effectively.",
  },
  {
    routeName: "intersection-observer-one",
    url: "/js/intersection-observer-one",
    group: Group.Js,
    description: "Use Intersection Observer for lazy loading or animations.",
  },
  {
    routeName: "intersection-observer-autoplay",
    url: "/js/intersection-observer-autoplay",
    group: Group.Js,
    description: "Automatically play videos when they enter the viewport.",
  },
  {
    routeName: "animation-api",
    url: "/js/animation-api",
    group: Group.Js,
    description: "Create animations using the Web Animation API.",
  },
  {
    routeName: "canvas-draw-tree",
    url: "/js/canvas-draw-tree",
    group: Group.Js,
    description: "Draw tree structures dynamically on a canvas.",
  },
  {
    routeName: "gsap-animation",
    url: "/js/gsap-animation",
    group: Group.Js,
    description: "Advanced animations using GSAP library.",
  },
  {
    routeName: "waterfall-grid",
    url: "/js/waterfall-grid",
    group: Group.Js,
    description: "Create and manage a waterfall-style grid layout.",
  },
  {
    routeName: "mouse-hover-effect",
    url: "/js/mouse-hover-effect",
    group: Group.Js,
    description: "Interactive effects when hovering over elements.",
  },
  {
    routeName: "proxy-reflect-api",
    url: "/js/proxy-reflect-api",
    group: Group.Js,
    description: "Learn and use Proxy and Reflect APIs in JavaScript.",
  },
  {
    routeName: "img-split-hover",
    url: "/js/img-split-hover",
    group: Group.Js,
    description: "Hover effect that splits and reveals an image.",
  },
  {
    routeName: "flip-animation",
    url: "/js/flip-animation",
    group: Group.Js,
    description: "Create card flip animations with JavaScript and CSS.",
  },
  {
    routeName: "screen-capture",
    url: "/js/screen-capture",
    group: Group.Js,
    description: "Capture screenshots of the web page programmatically.",
  },
  {
    routeName: "token-flash",
    url: "/js/token-flash",
    group: Group.Js,
    description: "Demonstrate a token flash effect using JavaScript.",
  },
  {
    routeName: "carousel",
    url: "/js/carousel",
    group: Group.Js,
    description: "Create an interactive image or content carousel.",
  },
  {
    routeName: "citation",
    url: "/js/citation",
    group: Group.Js,
    description: "Generate and manage citations dynamically.",
  },
  {
    routeName: "password-strength",
    url: "/js/password-strength",
    group: Group.Js,
    description: "Check and display password strength dynamically.",
  },
  {
    routeName: "concurrent-task",
    url: "/js/concurrent-task",
    group: Group.Js,
    description: "Handle concurrent tasks effectively in JavaScript.",
  },
  {
    routeName: "tiptap",
    url: "/js/tiptap",
    group: Group.Js,
    description: "try to use tiptap",
  },
  {
    routeName:"web-speech-api",
    url:"/js/web-speech-api",
    group:Group.Js,
    description:"Use the Web Speech API to convert speech to text.",
  }
];

export const cssGroups: Array<Link> = [
  {
    routeName: "rounded-highlight",
    url: "/css/rounded-highlight",
    group: Group.Css,
    description: "Highlight text with smooth rounded corners.",
  },
  {
    routeName: "coffee-cup",
    url: "/css/coffee-cup",
    group: Group.Css,
    description: "Stylized coffee cup icon with CSS effects.",
  },
  {
    routeName: "bubble-up",
    url: "/css/bubble-up",
    group: Group.Css,
    description: "Create bubbling animations using CSS.",
  },
  {
    routeName: "box-reflect",
    url: "/css/box-reflect",
    group: Group.Css,
    description: "Add reflection effects to elements with CSS.",
  },
  {
    routeName: "btn-collapse",
    url: "/css/btn-collapse",
    group: Group.Css,
    description: "Interactive collapsing button styles.",
  },
  {
    routeName: "text-title",
    url: "/css/text-title",
    group: Group.Css,
    description: "Stylized title text using advanced CSS.",
  },
  {
    routeName: "hover-effect",
    url: "/css/hover-effect",
    group: Group.Css,
    description: "Various hover effects to enhance user interaction.",
  },
  {
    routeName: "hover-effect-edge",
    url: "/css/hover-effect-edge",
    group: Group.Css,
    description: "Hover effects focusing on edge animations.",
  },
  {
    routeName: "text-empty",
    url: "/css/text-empty",
    group: Group.Css,
    description: "Create empty or transparent text effects.",
  },
  {
    routeName: "image-size",
    url: "/css/image-size",
    group: Group.Css,
    description: "Responsive image sizing techniques with CSS.",
  },
  {
    routeName: "aspect-ratio",
    url: "/css/aspect-ratio",
    group: Group.Css,
    description: "Maintain aspect ratios for elements with CSS.",
  },
  {
    routeName: "rotate-img",
    url: "/css/rotate-img",
    group: Group.Css,
    description: "Apply rotation animations to images.",
  },
  {
    routeName: "text-eraser",
    url: "/css/text-eraser",
    group: Group.Css,
    description: "Create an eraser effect for text.",
  },
  {
    routeName: "css-selector",
    url: "/css/css-selector",
    group: Group.Css,
    description: "Demonstrate the power of advanced CSS selectors.",
  },
  {
    routeName: "dot-loading",
    url: "/css/dot-loading",
    group: Group.Css,
    description: "Create loading animations with bouncing dots.",
  },
  {
    routeName: "svg-animation",
    url: "/css/svg-animation",
    group: Group.Css,
    description: "Animate SVG elements using CSS.",
  },
  {
    routeName: "poem-text-order",
    url: "/css/poem-text-order",
    group: Group.Css,
    description: "Arrange text in poetic sequences with CSS.",
  },
  {
    routeName: "rwd-width-height",
    url: "/css/rwd-width-height",
    group: Group.Css,
    description: "Responsive design for managing width and height.",
  },
  {
    routeName: "noise-img",
    url: "/css/noise-img",
    group: Group.Css,
    description: "Generate noise effects on images with CSS.",
  },
  {
    routeName: "houdini-apis",
    url: "/css/houdini-apis",
    group: Group.Css,
    description: "Explore CSS Houdini APIs for advanced effects.",
  },
  {
    routeName: "hover-padding",
    url: "/css/hover-padding",
    group: Group.Css,
    description: "Create hover effects with dynamic padding changes.",
  },
  {
    routeName: "mac-docker",
    url: "/css/mac-docker",
    group: Group.Css,
    description: "Create a Mac-style dock with CSS.",
  },
  {
    routeName: "css-wrapped",
    url: "/css/css-wrapped",
    group: Group.Css,
    description: "Trying to use 2024 css new features",
  },
];
