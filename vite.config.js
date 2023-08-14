import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import sassPlugin from "vite-plugin-sass";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sassPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@page": path.resolve(__dirname, "./src/page"),
    },
  },
});
