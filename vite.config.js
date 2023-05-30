import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import pxtorem from 'postcss-pxtorem'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  css: {
    postcss: {
      plugins: [
        pxtorem({
          rootValue: 16,
          propList: ['*'],
          exclude: /node_modules/i
        })
      ]
    }
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      '@':resolve(__dirname, 'src/'),
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
})
