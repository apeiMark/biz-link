import { mergeConfig } from 'vite'
import eslint from 'vite-plugin-eslint'
import baseConfig from './vite.config.base'
console.log('Loading vite.config.dev.ts...')
export default mergeConfig(
  {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081/', // 实际请求地址
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    mode: 'development',
    server: {
      open: true,
      host: '0.0.0.0',
      port: 5174,
      cors: true,
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig
)
