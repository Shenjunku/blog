---
title: webpack之Loader
date: 2022-8-02
sidebar: 'auto'
categories:
 - webpack配置
tags:
 - webpack配置
---
## loader的作用
在 Webpack 中，**Loader（加载器）** 是用于处理非 JavaScript 模块的核心机制。**Webpack 本身默认只能原生解析 JavaScript 和 JSON 文件**，对于 CSS、图片、TypeScript 等非 JS/JSON 类型的文件，Webpack 无法直接处理，必须通过 Loader 进行转换。从而纳入依赖图进行打包。

### Loader 的核心作用

1. **格式转换**：将非 JS 格式的文件（如 CSS、TS、Vue 单文件组件）转为 JS 模块（Webpack 只能直接处理 JS 模块）。
2. **预处理**：在转换过程中对文件进行优化（如压缩 CSS、编译 ES6+ 语法、压缩图片等）。
3. **统一模块接口**：将不同类型的资源转换为 Webpack 能理解的 “模块” 格式，使其可以通过 `import`/`require` 引入并参与依赖分析。

### Loader 的工作特点

- **链式调用**：多个 Loader 可以按顺序链式执行（如处理 SCSS 时，`sass-loader` → `css-loader` → `style-loader`），前一个 Loader 的输出作为后一个 Loader 的输入。
- **执行顺序**：在配置中，Loader 的调用顺序是**从右到左**（或从下到上）。例如 `use: ['style-loader', 'css-loader']` 中，`css-loader` 先执行，再将结果传给 `style-loader`。
- **针对性处理**：每个 Loader 通常只负责一种类型的文件（如 `babel-loader` 处理 JS，`file-loader` 处理图片）


### 常用的 loader

| loader 名称        | 主要作用                                                     | 常用场景/备注                                                |
| :----------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **babel-loader**   | 将 ES6+ 或更新版本的 JavaScript 代码转换为向后兼容的 JS 代码（如 ES5）。 | 使新的 JS 特性在旧版本浏览器中也能运行。通常需要配合 Babel 的核心库和预设（如 `@babel/preset-env`）使用。 |
| **css-loader**     | 解析 CSS 文件中的 `@import` 和 `url()` 等语句，将 CSS 转换为 JavaScript 模块。 | 让 Webpack 能识别和处理 CSS 文件。通常与 `style-loader` 或 `MiniCssExtractPlugin.loader` 配合使用。 |
| **style-loader**   | 将 `css-loader` 处理后的 CSS 代码，以 `<style>` 标签的形式注入到 HTML 的 `<head>` 中。 | **注意 loader 执行顺序**：`use: ['style-loader', 'css-loader']` 表示先执行 `css-loader`，再执行 `style-loader`（即从右向左）。 |
| **sass-loader**    | 将 Sass/SCSS 文件编译成 CSS。                              | 需要配合 `css-loader` 和 `style-loader`（或其他 CSS 提取 loader）使用。通常还会安装 `node-sass` 或 `dart-sass` 作为依赖。 |
| **less-loader**    | 将 Less 文件编译成 CSS。                                    | 作用与 `sass-loader` 类似，用于处理 Less 文件。              |
| **postcss-loader** | 对 CSS 进行后处理，例如**自动添加浏览器前缀**、压缩等。    | 通常需要与 `autoprefixer` 等 PostCSS 插件配合使用。          |
| **file-loader**    | 将文件（如图片、字体）输出到一个文件夹中，并在代码中返回最终的文件路径。 | 处理静态资源文件。                                           |
| **url-loader**     | 与 `file-loader` 类似，但能在文件大小低于指定限制时，将文件内容转换为 **Data URL** (base64) 内联到代码中。 | 小文件转为 base64 可减少 HTTP 请求次数。大文件则会回退到使用 `file-loader`。需要先安装 `file-loader`。 |
| **html-loader**    | 将 HTML 文件导出为字符串，并处理其中引用的静态资源（如图片的 `src` 属性）。 | 使 HTML 文件也能被 Webpack 处理。                            |
| **vue-loader**     | 处理 `.vue` 单文件组件，将其中的模板、脚本和样式拆解并交给对应的 loader 处理。 | 开发 Vue.js 项目时必备。                                     |
| **ts-loader**      | 将 TypeScript 代码编译成 JavaScript。                     | 使 Webpack 能够处理 `.ts` 和 `.tsx` 文件。                   |
| **eslint-loader**  | 在代码打包过程中，使用 ESLint 检查 JavaScript 代码规范和质量。 | 通常用于代码预处理，可以在编译前发现潜在问题。               |