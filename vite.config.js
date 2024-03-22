import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // Specify the base URL for your application
  // base: '/',

  // Configure the output directory for your build artifacts
  // For example, if you want to output files to a 'dist' directory
  // outDir: 'dist',

  // Configure the development server
  // server: {
  //   port: 3000, // Specify the port for the development server
  //   open: true, // Automatically open the browser when the server starts
  // },

  // Additional configuration options can be added as needed

  // Resolve configuration
  // resolve: {
  //   // Create aliases to simplify imports
  //   alias: {
  //     // Example alias for the 'models' directory
  //     "@models": resolve(__dirname, "models"),
  //   },
  // },
  base: "/", // Specify the base URL for your application
  // Other configuration options...

  resolve: {
    alias: {
      // Add alias for the 'textures' directory
      "@textures": resolve(__dirname, "textures"),
    },
  },

  // Define optimization options
  optimizeDeps: {
    // Specify which dependencies should be treated as external dependencies
    // Include dependencies that should not be bundled by Vite
    include: ["three"],
  },
});
