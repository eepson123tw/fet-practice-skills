import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import * as glob from "glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDir = path.join(__dirname, "fet-trick");

async function processHtmlFiles(targetDir: string, contentDir: string) {
  // Read the files from the source directory
  // const files = await fs.promises.readdir(contentDir);
  const files: string[] = glob.sync(`${contentDir}/**/*.html`); // Fetch HTML files including in subdirectories
  const htmlFiles = files.filter((file) => file.endsWith(".html"));
  // Process each HTML file
  await Promise.all(
    htmlFiles.map(async (file) => {
      const fileName = path.basename(file); // Get the file name, e.g., 'example.html'
      console.log(`Processing: ${fileName}`);
      let content = await fs.promises.readFile(file, "utf-8");

      content = content.replace(
        /<audio src="\.\.\/public\/([^"]+)" controls type="audio\/ogg" id="audio-player"><\/audio>/g,
        '<audio src="./$1" type="audio/ogg" controls id="audio-player"></audio>'
      );
      // Update <source> paths
      content = content.replace(
        /<source src="\.\.\/public\/([^"]+)" type="audio\/ogg">/g,
        '<source src="./$1" controls type="audio/ogg">'
      );
      // Update <script> paths
      content = content.replace(
        /<script src="\.\.\/utils\/[^"]+\.(t|j)s"><\/script>/g,
        '<script type="module" crossorigin src="/assets/index.js"></script>'
      );

      const title = content.match(/<title>([^<]+)<\/title>/)?.[1];
      // Update <script> add icon
      if (title) {
        content = content.replace(
          /<title>([^<]+)<\/title>/,
          `<title>FE練習 - $1</title>\n   <link rel="icon" type="image/svg+xml" href="/vite.svg" />`
        );
      }
      // Write the modified file to the target directory
      await fs.promises.writeFile(
        path.join(targetDir, fileName),
        content,
        "utf-8"
      );
    })
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "build-only",
      apply: "build", // or 'serve'
      async generateBundle() {
        try {
          const targetDir = path.join(__dirname, "dist");
          await fs.promises.mkdir(targetDir, { recursive: true });
          // Process HTML files
          await processHtmlFiles(targetDir, contentDir);
          console.log("HTML files processed successfully!");
        } catch (error) {
          console.error("Error processing files:", error);
        }
      },
    },
  ],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
        // manualChunks: {
        //   react: ["react"],
        //   "react-dom": ["react-dom"],
        // },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
