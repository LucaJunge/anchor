import { resolve } from 'path'
import { defineConfig } from 'vite'
import { readFileSync } from 'fs'

const options = {
  cert: readFileSync('C:\\httpscert\\localhost.pem'),
  key: readFileSync('C:\\httpscert\\localhost-key.pem'),
}

export default defineConfig({
  server: {
    https: options,
  },
  plugins: [],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/Entry.js'),
      name: 'Anchor',
      fileName: 'anchor',
    },
    rollupOptions: {
      external: ['three'],
      output: {
        globals: {
          three: 'three',
        },
      },
    },
  },
})
