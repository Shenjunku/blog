---
title: vite
date: 2025-8-02
sidebar: 'auto'
categories:
 - vite
tags:
 - vite
---
## Vite 是一个基于原生 ESM 的前端构建工具，核心目标是提升开发体验

### vite的核心特性

- 基于原生 ES 模块（ESM）：Vite 利用浏览器原生的 ES 模块，在开发模式下`按需加载`模块，避免了整体打包，从而减少了启动时间。它通过只编译实际修改的文件，提升了开发过程中的反馈速度。
- 高效的热模块替换（HMR）：Vite 在开发模式下利用原生 ES 模块实现模块级的热更新。当文件发生变化时，Vite 只会重新加载发生变化的模块，而不是重新打包整个应用，极大提高了热更新的速度。
- 使用 esbuild 进行快速编译：Vite 默认使用 esbuild 作为编译工具，相比传统的 JavaScript 编译工具（如 Babel、Terser），esbuild 提供显著的性能提升，能够快速完成代码转换和压缩，从而加速开发和构建过程。
- 现代 JavaScript 特性支持：Vite 在生产环境中使用 Rollup 构建，支持优秀的树摇和代码拆分，有效减小构建体积。同时，Vite 利用现代浏览器特性（如动态导入、ES2015+ 模块），减少了 polyfill 的使用，提升了加载速度。
- 预构建和缓存：Vite 在开发时会预构建常用依赖（如 Vue、React），并将其转换为浏览器可执行的格式，避免每次启动时重新编译。同时，Vite 会缓存这些预构建的依赖，并在启动时复用缓存，从而加快启动速度。


- **开发环境**：基于原生 ESM 实时编译，不打包。
  原因：利用浏览器原生 `import` 能力，按需加载模块，避免预打包的性能开销，实现极速启动和热更新。
- **生产环境**：基于 Rollup 打包。
  原因：
  - 浏览器原生 ESM 加载大量细碎文件时，网络请求开销大（影响生产性能）；
  - Rollup 对 Tree-shaking、代码分割、压缩的支持更优，能生成更精简的生产代码；
  - 复用 Rollup 成熟的打包能力，无需重复开发。

#### Vite 为什么比 Webpack 启动快？

- **Webpack**：启动前需**打包所有模块**，项目越大速度越慢。
- **Vite**：
  - **基于原生 ESM**：浏览器直接按需导入模块，Vite 仅按需编译转换并提供，**免去打包环节**。
  - **依赖预构建**：使用 **esbuild**（Go 编写）处理依赖，比 JS 编写的打包器快 **10-100 倍**。
  - **缓存**：依赖模块强缓存，源码模块协商缓存  


#### 如何在 Vite 中处理 CSS

Vite 内置对 CSS 的支持，无需额外配置：

- 直接导入 `.css` 文件，样式会被注入到页面的 `<style>` 标签中；
- 支持 CSS Modules（文件命名为 `*.module.css`），自动生成作用域类名；
- 支持预处理器（Sass/Scss、Less、Stylus），只需安装对应依赖（如 `sass`）即可直接使用

```javascript
import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { viteMockServe } from 'vite-plugin-mock';
import legacy from '@vitejs/plugin-legacy';
import autoprefixer from 'autoprefixer';
import compressPlugin from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd());
  
  return {
    // 项目根目录（index.html所在位置）
    root: process.cwd(),
    
    // 部署基础路径
    base: env.VITE_BASE_URL || '/',
    
    // 插件配置
    plugins: [
      // Vue 支持
      vue(),
      
      // JSX 支持（若使用Vue的JSX语法）
      vueJsx(),
      
    
      
      // 旧浏览器兼容（如IE11）
      legacy({
        targets: ['defaults', 'not IE 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      
      // 生产环境资源压缩（gzip）
      mode === 'production' && compressPlugin({
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240, // 大于10kb的文件才压缩
        minRatio: 0.8
      }),
      
      // 打包体积分析（生产环境可选）
      mode === 'production' && visualizer({
        open: false, // 自动打开分析报告
        gzipSize: true, // 显示gzip压缩大小
        brotliSize: true // 显示brotli压缩大小
      })
    ].filter(Boolean), // 过滤掉false的插件
    
    // 解析配置
    resolve: {
      // 路径别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'assets': path.resolve(__dirname, 'src/assets'),
        'components': path.resolve(__dirname, 'src/components'),
        'views': path.resolve(__dirname, 'src/views'),
        'utils': path.resolve(__dirname, 'src/utils')
      },
      // 导入时省略的扩展名
      extensions: ['.vue', '.js', '.jsx', '.ts', '.tsx', '.json']
    },
    
    // 开发服务器配置
    server: {
      host: '0.0.0.0', // 允许外部访问
      port: Number(env.VITE_PORT) || 3000, // 端口号
      open: true, // 自动打开浏览器
      https: false, // 是否启用HTTPS
      cors: true, // 允许跨域
      
      // 热更新配置
      hmr: {
        overlay: true // 热更新错误全屏显示
      },
      
      // 接口代理（解决跨域）
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/upload': {
          target: env.VITE_UPLOAD_BASE_URL || 'http://localhost:8080',
          changeOrigin: true
        }
      }
    },
    
    // 构建配置
    build: {
      // 输出目录
      outDir: 'dist',
      
      // 静态资源目录
      assetsDir: 'assets',
      
      // 生成的静态资源文件名中包含hash，用于缓存控制
      assetsInlineLimit: 4096, // 小于4kb的资源内嵌到JS中
      
      // 生产环境sourcemap
      sourcemap: mode !== 'production',
      
      // 代码压缩
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production', // 生产环境移除console
          drop_debugger: mode === 'production' // 生产环境移除debugger
        }
      },
      
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 1024,
      
      // Rollup配置
      rollupOptions: {
        // 静态资源分类打包
        output: {
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return 'css/[name]-[hash].[ext]';
            }
            if (/\.(png|jpe?g|gif|svg)$/.test(assetInfo.name)) {
              return 'images/[name]-[hash].[ext]';
            }
            if (/\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
              return 'fonts/[name]-[hash].[ext]';
            }
            return 'assets/[name]-[hash].[ext]';
          },
          // 代码分割
          manualChunks: {
            // 第三方库单独打包
            vendor: ['vue', 'vue-router', 'pinia', 'axios'],
            // UI组件库单独打包
            ui: ['element-plus', 'vant']
          }
        }
      }
    },
    
    // CSS配置
    css: {
      // 启用CSS Modules
      modules: {
        // 生成的类名格式
        generateScopedName: '[name]-[hash:base64:5]'
      },
      
      // 预处理器配置
      preprocessorOptions: {
        scss: {
          // 全局导入scss变量和混合
          additionalData: `
            @import "@/styles/variables.scss";
            @import "@/styles/mixins.scss";
          `
        },
        less: {
          // 全局less变量
          additionalData: `@import "@/styles/variables.less";`
        }
      },
      
      // PostCSS配置
      postcss: {
        plugins: [
          // 自动添加浏览器前缀
          autoprefixer({
            overrideBrowserslist: ['last 2 versions', '>1%', 'ios >= 10', 'android >= 7']
          })
        ]
      }
    },
    
    // 优化配置
    optimizeDeps: {
      // 需要预构建的依赖
      include: [
        'vue',
        'vue-router',
        'pinia',
        'axios',
        'element-plus/es/components/form/style/css',
        'element-plus/es/components/form-item/style/css'
      ],
      // 排除不需要预构建的依赖
      exclude: []
    }
  };
});
```    