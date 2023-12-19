import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

// I'm doing this at work, teehee
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

export default defineConfig({
  plugins: [sveltekit()],

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;',
      },
    },
  },
});
