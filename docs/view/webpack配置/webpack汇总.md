---
title: webpack汇总
date: 2022-8-02
sidebar: 'auto'
categories:
 - webpack配置
tags:
 - webpack配置
---

### Loader 和 Plugin 有什么区别

| **特性**     | **Loader**                        | **Plugin**                                        |
| :----------- | :--------------------------------- | :------------------------------------------------- |
| **主要作用** | **转换文件内容**（如转译、预处理） | **扩展构建流程**（优化、资源管理、注入环境变量等） |
| **执行时机** | 在模块加载时（文件转换为模块时）   | 在整个构建生命周期（从初始化到输出）的各个阶段     |
| **配置方式** | 通过 `module.rules` 数组配置       | 通过 `plugins` 数组配置（需要 `new` 实例化）       |
| **典型场景** | 处理 JS/CSS/图片等文件转译         | 生成 HTML、压缩代码、提取 CSS 等全局操作           |
| **依赖关系** | 针对特定文件类型（如 `.scss` ）    | 不依赖文件类型，可干预整个构建流程                 |

### **模块热更新（HMR）原理**

模块热更新（HMR）是 Webpack 提供的一个强大功能，它允许在运行时更新各种模块，而无需进行完整的浏览器刷新。其核心原理主要包括：

1. **建立 WebSocket 连接**：`webpack-dev-server` (WDS) 和浏览器之间维护了一个 **WebSocket** 服务，用于实时通信。
2. **文件监控与编译**：当本地资源发生变化时，Webpack 会先重新编译改动的模块，并将新的模块代码放入内存中。
3. **消息推送与对比**：WDS 通过 WebSocket 向浏览器推送更新消息，并附带上本次构建的 `hash` 值。客户端（即浏览器中运行的 HMR runtime）会与上一次资源进行对比。
4. **获取更新内容**：客户端对比出差异后，会向 WDS 发起 **Ajax** 请求来获取更改的文件列表和最新的 `hash` 值。
5. **应用更新**：客户端再借助这些信息通过 **JSONP** 请求获取到最新的模块代码增量更新，然后替换掉运行时中相应的模块。

#### 什么是 Tree-shaking？如何启用？

**答**：Tree-shaking 是移除项目中 “未被使用的代码（死代码）” 的优化方式，减少打包体积。
启用条件：

- 项目使用 **ES6 模块**（`import`/`export`，而非 CommonJS 的 `require`）；
- 配置 `mode: 'production'`（Webpack 生产环境默认启用）；
- 若使用 Babel，需关闭 `@babel/preset-env` 的 `modules: 'commonjs'`（避免将 ES6 模块转为 CommonJS）。

#### 代码分割（Code Splitting）

Webpack 代码分割有 3 种方式：

1. **多入口分割**：配置多个 `entry`，每个入口生成独立 bundle。

2. 自动分割公共代码：通过splitChunks提取公共依赖（如node_modules中的库）：

   ```javascript
   optimization: { splitChunks: { chunks: 'all' } }
   ```

3. 动态导入（懒加载）：通过import()语法动态加载模块，Webpack 会将其拆分为单独 chunk：
    ```javascript
      // 点击按钮时才加载模块
      button.onclick = () => {
      import('./module.js').then((module) => module.doSomething());
      };
    ```

#### 优化 Webpack 的构建速度

- **使用高版本 Webpack 和 Node.js**：新版本通常有性能优化。
- **缓存**：
  - 使用 `cache-loader` 或配置 `babel-loader` 的 `cacheDirectory: true` 来缓存 Loader 的处理结果。
  - 在 Webpack 5 中，可以使用内置的持久化缓存：`cache: { type: 'filesystem' }`。
- **多进程/多实例构建**：使用 `thread-loader` 或 `happypack` 将 Loader 处理放在工作池中运行，并行处理任务。
- **缩小打包范围**：
  - 在 Loader 规则中使用 `include` 和 `exclude` 精确指定处理范围，避免对 `node_modules` 等目录不必要的处理。
  - 优化 `resolve.modules` 路径解析（例如直接指定 `node_modules` 的绝对路径），减少搜索范围。
- **DLL Plugin**：使用 `DllPlugin` 和 `DllReferencePlugin` 将不常变化的第三方库（如 React, Vue, Lodash）预先打包成动态链接库，后续构建直接引用，极大提升构建速度。  

####  Webpack 减小输出包体积

- **Tree Shaking**：移除未使用的代码（"dead code"）。
  - **生效条件**：使用 ES2015 模块语法（`import` 和 `export`），在生产模式（`mode: 'production'`）下默认开启，并在 `package.json` 中配置 `"sideEffects": false` 或指定有副作用的文件列表。
- **代码分割 (Code Splitting)**：
  - 配置 `optimization.splitChunks` 提取公共代码和第三方库。
  - 使用动态导入（`import()`）语法实现路由懒加载。
- **压缩代码**：
  - 生产模式默认使用 `TerserWebpackPlugin` 压缩 JS。
  - 使用 `CssMinimizerWebpackPlugin` 压缩 CSS。
- **资源压缩**：使用 `image-webpack-loader` 等压缩图片。
- **利用 CDN (externals)**：通过 `externals` 配置将一些大型第三方库（如 React, Vue）排除在打包之外，改为通过 CDN 引入。

### Module 和 Chunk 和 Bundle 的区别
- **Module（模块）**:
项目中最小的代码单元，对应单个文件（如 `a.js`、`style.css`、`image.png` 等），Webpack 会将所有资源都视为模块。
- **Chunk（代码块）**：
 由多个相互依赖的 `Module` 组合而成的中间代码块，是 Webpack **打包过程中生成的中间文件**
  它是 “未完成的产物”，存在于内存或打包流程中，比如：
  - 入口文件及其依赖形成的初始 chunk；
  - 代码分割（如 `splitChunks`、`import()`）产生的独立 chunk。
- **Bundle（最终 bundle 文件）**：
  是 Webpack **打包完成后输出到磁盘的最终文件**（如 `main.js`、`vendors.js`）。
  它是 “最终产物”，由一个或多个 chunk 经过优化、合并、压缩后生成，可直接被浏览器加载。


| 概念       | 定义                                                         | 阶段       | 举例                                                         |
| ---------- | ------------------------------------------------------------ | ---------- | ------------------------------------------------------------ |
| **Module** | 项目中最小的代码单元，对应单个文件（任何类型的文件都可视为模块） | 原始阶段   | `index.js`、`style.css`、`image.png` 等单个文件              |
| **Chunk**  | 由多个相互依赖的 `module` 组合而成的中间代码块，是打包过程中的 “半成品” | 打包过程中 | 入口文件及其依赖形成的初始代码块、代码分割产生的独立代码块（如 `vendors` 公共库） |
| **Bundle** | 对 `chunk` 优化（压缩、合并等）后输出到磁盘的最终文件        | 输出阶段   | `main.8f2d.js`、`vendors.3e5c.css` 等可直接被浏览器加载的文件 |