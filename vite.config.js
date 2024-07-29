import { resolve } from 'path'
import { defineConfig } from 'vite'
import { readFileSync } from 'fs'
import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl'

const options = null
try {
  const options = {
    cert: readFileSync('C:\\httpscert\\localhost-new.pem'),
    key: readFileSync('C:\\httpscert\\localhost-key-new.pem'),
  }
} catch (error) {
  console.log(error)
}

let httpsAvailable = options !== null ? options : true

export default defineConfig({
  server: {
    https: httpsAvailable,
  },
  plugins: [viteBasicSslPlugin()],
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
