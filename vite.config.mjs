import { defineConfig } from 'vite';
import fs from "node:fs";
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync("certs/localhost-key.pem"),
      cert: fs.readFileSync("certs/localhost.pem"),
    },    
  },
  plugins: [
    isDev
      ? tanstackRouter({
          target: 'react',
          routesDirectory: './src/routes',
          generatedRouteTree: './src/routeTree.gen.ts',
          autoCodeSplitting: false, // Disable in dev
        })
      : tanstackRouter({
          target: 'react',
          routesDirectory: './src/routes',
          generatedRouteTree: './src/routeTree.gen.ts',
          autoCodeSplitting: true,
        }), 
    react(), 
    tsconfigPaths()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          mantine: ['@mantine/core', '@mantine/hooks', '@mantine/notifications'],
          router: ['@tanstack/react-router'],
          signalr: ['@microsoft/signalr'],
          utils: ['zustand', 'immer'],
        }
      },      
      onwarn(warning, defaultHandler) {
        if (
          warning.code === "SOURCEMAP_ERROR" ||
          (warning.code === "INVALID_ANNOTATION" &&
            warning.message.includes("/*#__PURE__*/"))
        ) {
          return;
        }
        defaultHandler(warning);
      },
    },
  },  
});
