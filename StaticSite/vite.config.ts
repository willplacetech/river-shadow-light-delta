import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const siteRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  root: siteRoot,
  plugins: [tailwindcss()],
  publicDir: resolve(siteRoot, "../public"),
  build: {
    outDir: resolve(siteRoot, "dist"),
    emptyOutDir: true,
  },
});
