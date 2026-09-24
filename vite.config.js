import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import seoHead from "./vite-plugins/seoHead.js";

export default defineConfig({
  plugins: [react(), seoHead()],
});
