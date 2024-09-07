import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Define your groups
export const canvasGroups = [
  {
    routeName: "canvas-music",
    url: "/canvas-music.html",
    group: "canvas",
  },
  { routeName: "canvas-img", url: "/canvas-img.html", group: "canvas" },
  { routeName: "draw-dot", url: "/draw-dot.html", group: "canvas" },
  {
    routeName: "canvas-drawer",
    url: "/canvas-drawer.html",
    group: "canvas",
  },
];

export const browserApiGroups = [
  { routeName: "clipboard-api", url: "/clipboard-api.html", group: "browser" },
  { routeName: "eye-dropper", url: "/eye-dropper.html", group: "browser" },
  { routeName: "media-query", url: "/media-query.html", group: "browser" },
  { routeName: "read-file", url: "/read-file.html", group: "browser" },
  { routeName: "page-api", url: "/page-api.html", group: "browser" },
];
export const jsGroups = [
  { routeName: "traffic-light", url: "/traffic-light", group: "js" },
  {
    routeName: "run-thousand-task",
    url: "/run-thousand-task",
    group: "js",
  },
  { routeName: "frame-img", url: "/frame-img", group: "js" },
  { routeName: "color-thief", url: "/color-thief", group: "js" },
  { routeName: "2048", url: "/2048", group: "js" },
  { routeName: "color-thief", url: "/color-thief", group: "js" },
  { routeName: "text-track", url: "/text-track", group: "js" },
  { routeName: "hoc-task", url: "/hoc-run-task", group: "js" },
  {
    routeName: "broadcastChannel-card",
    url: "/broadcastChannel-card",
    group: "js",
  },
  { routeName: "drag-api", url: "/drag-api", group: "js" },
  { routeName: "visible-list", url: "/visible-list", group: "js" },
  { routeName: "list-animation", url: "/list-animation", group: "js" },
  {
    routeName: "async-function-call",
    url: "/async-function-call",
    group: "js",
  },
  {
    routeName: "intersection-observer-one",
    url: "/intersection-observer-one",
    group: "js",
  },
  {
    routeName: "intersection-observer-two",
    url: "/intersection-observer-two",
    group: "js",
  },
  {
    routeName: "animation-api",
    url: "/animation-api",
    group: "js",
  },
  {
    routeName: "canvas-draw-tree",
    url: "/canvas-draw-tree",
    group: "js",
  },
];

export const cssGroups = [
  {
    routeName: "rounded-highlight",
    url: "/rounded-highlight.html",
    group: "css",
  },
  { routeName: "coffee-cup", url: "/coffee-cup.html", group: "css" },
  { routeName: "bubble-up", url: "/bubble-up.html", group: "css" },
  { routeName: "box-reflect", url: "/box-reflect.html", group: "css" },
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the source and target directories
const sourceDir = path.join(__dirname, "fet-trick");
const targetDir = path.join(__dirname, "fet-trick");

// A helper function to move a file
async function moveFile(sourcePath, targetPath) {
  try {
    await fs.promises.mkdir(path.dirname(targetPath), { recursive: true }); // Ensure the target directory exists
    await fs.promises.rename(sourcePath, targetPath); // Move the file
    console.log(`Moved ${sourcePath} to ${targetPath}`);
  } catch (error) {
    console.error(`Failed to move ${sourcePath} to ${targetPath}:`, error);
  }
}

// A function to process each group and move files to the correct folder
async function processGroup(group, groupName) {
  for (const link of group) {
    const sourcePath = path.join(sourceDir, link.url); // Path of the file in the source folder
    const targetPath = path.join(
      targetDir,
      groupName,
      link.routeName + ".html"
    ); // Target path based on the group
    await moveFile(sourcePath, targetPath); // Move the file
  }
}

// Main function to move all files
async function moveAllFiles() {
  try {
    // console.log("Processing Canvas Group...");
    // await processGroup(canvasGroups, "canvas");

    // console.log("Processing Browser API Group...");
    // await processGroup(browserApiGroups, "browser");

    console.log("Processing JS Group...");
    await processGroup(jsGroups, "js");

    // console.log("Processing CSS Group...");
    // await processGroup(cssGroups, "css");

    console.log("All files have been moved successfully.");
  } catch (error) {
    console.error("An error occurred during the file moving process:", error);
  }
}

// Call the main function
moveAllFiles();
