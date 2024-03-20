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
            const content = await fs.promises.readFile(
              path.join(contentDir, file),
              "utf-8"
            );
            console.log(path.join(targetDir, file));
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
});
