import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contentDir = path.join(__dirname, "fet-trick");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "build-only",
      apply: "build", // or 'serve'
      async generateBundle() {
        // This will run only when you run `vite build`
        const targetDir = path.join(__dirname, "dist");
        await fs.promises.mkdir(targetDir, { recursive: true });
        const files = await fs.promises.readdir(contentDir);
        const htmlFiles = files.filter((file) => file.endsWith(".html"));
        await Promise.all(
          htmlFiles.map(async (file) => {
            let content = await fs.promises.readFile(
              path.join(contentDir, file),
              "utf-8"
            );
            // Update source paths in <source> tags
            content = content.replace(
              /<source src="\.\.\/public\/([^"]+)" type="audio\/ogg">/g,
              '<source src="./$1" type="audio/ogg">'
            );

            // Update script paths
            content = content.replace(
              /<script src="\.\.\/utils\/[^"]+\.(t|j)s"><\/script>/g,
              '<script type="module" crossorigin src="/assets/index.js"></script>'
            );
            await fs.promises.writeFile(
              path.join(targetDir, file),
              content,
              "utf-8"
            );
          })
        );
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
