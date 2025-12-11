import react from "@vitejs/plugin-react";

import path from "path";
import vike from "vike/plugin";
import { defineConfig } from "vite";
import commonjs from "vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "local.bravocaribe.com",
    port: 8080,
  },
  plugins: [react(), commonjs(), vike()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~node_modules": path.resolve(__dirname, "./node_modules"),
    },
  },

  preview: {
    port: 8080,
    host: true,
  },
});
