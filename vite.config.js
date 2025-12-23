import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    // GitHub Pages 배포 시 base path 설정
    // 저장소 이름이 'calculator-demo'인 경우
    // 루트 도메인 배포 시에는 '/'로 설정
    base: isProduction ? '/calculator-demo/' : '/',
    
    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'assets',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'math': ['mathjs'],
          },
        },
      },
    },
    
    css: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
          require('cssnano')({
            preset: 'default',
          }),
        ],
      },
    },
  };
});
