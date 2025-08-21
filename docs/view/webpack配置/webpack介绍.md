---
title: webpack介绍
date: 2022-8-02
sidebar: 'auto'
categories:
 - webpack配置
tags:
 - webpack配置
---
## Webpack介绍
#### 一、基础概念
1. **定义**：Webpack 是一个**静态模块打包工具**，用于将前端项目中相互依赖的模块（JS、CSS、图片等）打包为浏览器可直接运行的静态资源。
2. **核心目标**：处理模块依赖、转换代码格式、优化资源体积，提升开发效率和运行性能。

#### 二、核心概念

| 概念       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| **Entry**  | 入口起点，指定 Webpack 从哪个文件开始分析依赖（默认 `./src/index.js`）。支持单入口（字符串）或多入口（对象）。 |
| **Output** | 输出配置，指定打包后的文件路径和命名规则（如 `filename` 控制入口文件名称，`chunkFilename` 控制非入口文件名称）。 |
| **Loader** | 模块转换器，用于处理非 JS 模块（如 CSS、图片、TypeScript 等），将其转为 Webpack 可识别的模块（如 `css-loader` 处理 CSS，`babel-loader` 转 ES6+ 为 ES5）。 |
| **Plugin** | 插件，用于扩展 Webpack 功能（如代码压缩、 Html 生成、环境变量注入等），需通过 `plugins` 配置（如 `HtmlWebpackPlugin` 生成 HTML，`CleanWebpackPlugin` 清理输出目录）。 |
| **Mode**   | 模式，指定构建环境（`development`/`production`/`none`），默认启用对应环境的内置优化（如生产环境自动压缩代码）。 |
| **Chunk**  | 代码块，Webpack 处理过程中生成的中间文件（如入口文件、异步加载的模块），一个 chunk 可对应多个文件。 |
| **Bundle** | 最终输出的文件（如 `main.js`、`vendor.js`），由一个或多个 chunk 打包生成。 |

#### 三、工作流程

1. **初始化**：读取配置文件（如 `webpack.config.js`），确定入口、输出、loader、plugin 等配置。
2. **构建依赖图**：从入口文件出发，递归分析所有依赖模块（通过 `require`/`import` 引入的文件），生成依赖图。
3. **模块转换**：对非 JS 模块（如 CSS、TS）调用对应 loader 进行转换（如 `sass-loader` 转 SCSS 为 CSS）。
4. **代码优化**：根据 mode 和插件进行优化（如 tree-shaking 移除死代码、代码分割、压缩等）。
5. **输出资源**：将处理后的模块打包为 bundle 文件，输出到 `output.path` 指定的目录。

#### 四、常用配置项

1. **`entry`**：入口配置

   ```javascript
   // 单入口
   entry: './src/main.js'
   // 多入口
   entry: {
     app: './src/app.js',
     admin: './src/admin.js'
   }
   ```

2. **`output`**：输出配置

   ```javascript
   output: {
     path: path.resolve(__dirname, 'dist'), // 输出目录（绝对路径）
     filename: 'js/[name].[contenthash:8].js', // 入口文件命名（含哈希，用于缓存）
     chunkFilename: 'js/[name].[contenthash:8].chunk.js' // 非入口文件命名
   }
   ```

3. **`module.rules`**：loader 配置（处理非 JS 模块）

   ```javascript
   module: {
     rules: [
       { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理 CSS
       { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }, // 转 ES6+
       { test: /\.(png|jpg)$/, type: 'asset/resource', generator: { filename: 'img/[hash][ext]' } } // 处理图片
     ]
   }
   ```

4. **`plugins`**：插件配置

   ```javascript
   plugins: [
     new HtmlWebpackPlugin({ template: './public/index.html' }), // 生成 HTML 并引入 bundle
     new CleanWebpackPlugin(), // 每次打包前清理 dist 目录
     new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }) // 注入环境变量
   ]
   ```

5. **`devServer`**：开发服务器配置（热更新、代理等）

   ```javascript
   devServer: {
     port: 8080, // 端口
     hot: true, // 热更新
     proxy: { '/api': { target: 'http://localhost:3000' } } // 接口代理（解决跨域）
   }
   ```


