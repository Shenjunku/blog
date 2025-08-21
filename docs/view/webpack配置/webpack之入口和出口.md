---
title: webpack之入口和出口
date: 2022-8-02
sidebar: 'auto'
categories:
 - webpack配置
tags:
 - webpack配置
---

在 Webpack 中，**入口（Entry）** 和**出口（Output）** 是配置文件中最基础且核心的两个概念，分别用于指定打包的起点和终点，直接决定了 Webpack 如何处理模块以及最终输出的资源形态。

### 一、入口（Entry）

**定义**：入口是 Webpack 开始打包的起点文件，Webpack 会从这个文件出发，递归分析其所有依赖的模块（如通过 `import`/`require` 引入的文件），最终形成完整的依赖图。

#### 作用：

1. **指定打包起点**：告诉 Webpack 从哪个文件开始解析代码和依赖（默认是 `./src/index.js`）。
2. **支持多入口**：可配置多个入口，实现多页面应用的打包（每个入口对应一个页面的核心文件）。

```javascript
// 1. 单入口（字符串形式）
module.exports = {
  entry: './src/main.js' // 从 src/main.js 开始打包
};

// 2. 多入口（对象形式）
module.exports = {
  entry: {
    home: './src/home.js',   // 首页入口
    admin: './src/admin.js'  // 管理页入口
  }
};
```

### 二、出口（Output）

**定义**：出口用于配置 Webpack 打包后生成的文件（如 JS、CSS、图片等）的存储路径、命名规则等，是打包结果的 “输出规则”。

#### 作用：

1. **指定输出路径**：定义打包后的文件存储在哪个目录（必须是绝对路径）。
2. **控制文件命名**：通过占位符（如 `[name]`、`[hash]`）动态生成文件名，支持缓存策略和多入口区分。
3. **统一资源管理**：将所有处理后的模块按规则输出，确保项目结构清晰（如 JS 放 `js/` 目录，图片放 `img/` 目录）。

```javascript
const path = require('path');

module.exports = {
  output: {
    // 输出目录（绝对路径）
    path: path.resolve(__dirname, 'dist'), 
    // 入口文件打包后的命名（单入口用固定名，多入口用 [name] 区分）
    filename: 'js/[name].[contenthash:8].js', 
    // 非入口文件（如异步加载的模块）的命名
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
    // 静态资源（如图片）的输出路径和命名
    assetModuleFilename: 'assets/[hash][ext]'
  }
};
```

#### 关键占位符说明：

- `[name]`：对应入口名称（如多入口中的 `home`、`admin`）或 chunk 名称。
- `[contenthash:8]`：根据文件内容生成的 8 位哈希值（内容不变则哈希不变，便于缓存）。
- `[hash]`：基于整个项目构建的哈希值（任何文件修改都会变化，适合整体版本控制）。
- `[ext]`：文件原始扩展名（如 `.js`、`.png`）。

### 总结

- **入口（Entry）**：告诉 Webpack “从哪里开始打包”，是依赖分析的起点。
- **出口（Output）**：告诉 Webpack“打包后文件放哪里、叫什么”，是资源输出的规则。
  两者配合使用，构成了 Webpack 打包的基础流程，所有模块的处理最终都会围绕入口展开，并按照出口规则输出到指定位置。