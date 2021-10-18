/* eslint-env node */
import dotenv from 'dotenv'

import { defineConfig } from "vite";
import { resolve } from "path";
import Vue from "@vitejs/plugin-vue";

dotenv.config()
process.env.VITE_BACKEND_URL = `https://${process.env.KIRBY_DEV_HOSTNAME}:${process.env.KIRBY_DEV_PORT}`;
process.env.VITE_BACKEND_API_SLUG = process.env.CONTENT_API_SLUG;
process.env.VITE_MULTILANG = process.env.KIRBY_MULTILANG;

const root = "src";

export default ({ mode }) =>
  defineConfig({
    root,
    base: mode === "development" ? "/" : "/dist/",

    resolve: {
      alias: {
        "~/": `${resolve(__dirname, root)}/`,
      },
    },

    build: {
      outDir: resolve(__dirname, "public/dist"),
      emptyOutDir: true,
      manifest: true,
      rollupOptions: {
        input: resolve(root, "index.js"),
      },
    },

    plugins: [Vue()],

    server: {
      cors: true,
      port: 3000,
      strictPort: true,
      https: true,
    },

    optimizeDeps: {
      include: ["vue", "vue-router"],
    },
  });
