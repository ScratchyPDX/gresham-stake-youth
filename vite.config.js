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
        main: resolve(__dirname, "src/index.html"),
        yw_camp: resolve(__dirname, "src/yw_camp/index.html"),
        ym_camp: resolve(__dirname, "src/ym_camp/index.html"),
        youth_conference: resolve(__dirname, "src/youth_conference/index.html"),
        helpful_resources: resolve(__dirname, "src/helpful_resources/index.html")
      }
    }
  }
});
