import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const base = process.env.VITE_BASE ?? "/";

export default defineConfig({
  base,
  plugins: [
    react(),
    {
      name: "prefix-public-css-urls",
      transform(code, id) {
        if (!id.endsWith("tokens.css")) return;
        const prefix = base.replace(/\/$/, "");
        return code.replaceAll('url("/', `url("${prefix}/`);
      },
    },
  ],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    allowedHosts: ["playson-power-pack-salesdeck"],
  },
});
