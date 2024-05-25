import { defineConfig } from 'vite'
import { threeMinifier } from "@yushijinhun/three-minifier-rollup";
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [
    { ...threeMinifier(), enforce: "pre" },
    solid()
  ],
  build: {
    minify: 'terser',
  }
})
