import { defineConfig } from "vite";

export default defineConfig({
  // The base path for your application
  base: "./",

  // Development server configuration
  server: {
    // Port number
    port: 3000,

    // Hostname
    host: "localhost",

    // Enable HTTPS
    https: false,
  },

  // Production build configuration
  build: {
    // Output directory
    outDir: "dist",

    // Ensure that assets are served relative to the current directory
    assetsDir: "./",

    // Enable/disable minification
    minify: true,

    // Enable/disable CSS code splitting
    cssCodeSplit: true,

    // Configure assets behavior
    assetsInlineLimit: 4096,

    // Enable/disable chunk splitting
    chunkSizeWarningLimit: 500,

    // Configure source map generation
    sourcemap: false,

    // Modify rollup options to include STL file in the output directory
    rollupOptions: {
      input: {
        main: "index.html",
        // Ensure your STL file is included here
        // For example, if it's in the "models" directory:
        // 'models/ear.stl': './models/ear.stl'
      },
      output: {
        // Ensure your STL file is included in the output directory
        // For example, if it's in the "models" directory:
        // dir: 'dist',
        // entryFileNames: '[name].[hash].js'
      },
    },
  },
});
