import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "src": path.resolve(__dirname, "./src"),
      "assets": path.resolve(__dirname, "./src/assets"),
      "components": path.resolve(__dirname, "./src/components"),
      "context": path.resolve(__dirname, "./src/context"),
      "hooks": path.resolve(__dirname, "./src/hooks"),
      "screens": path.resolve(__dirname, "./src/screens"),
      "types": path.resolve(__dirname, "./src/types"),
      "utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
