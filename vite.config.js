import { resolve } from "path";
import { defineConfig } from "vite";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  root: "src/",
  define: {
    "process.env": process.env
  },
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html")
      }
    }
  }
});
