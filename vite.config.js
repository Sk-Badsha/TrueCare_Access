import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const config = {
    plugins: [react()],
    server: {},
  };

  // Use proxy only in development mode
  if (mode === "development") {
    config.server.proxy = {
      "/api": {
        target: process.env.VITE_BACKEND_ENDPOINT,
        changeOrigin: true,
      },
    };
  }

  return defineConfig(config);
};
