---
title: HTML篇
date: 2022-8-01
sidebar: 'auto'
categories:
 - 前端
tags:
 - 前端
---
 **DOCTYPE** **的作用**

- 告诉浏览器当前文档使用的 HTML 版本
- 避免浏览器进入怪异模式（Quirks Mode），确保页面按照标准模式渲染，保证跨浏览器的一致性

**HTML 语义化的理解**
- HTML 语义化指用有明确含义的标签（如header article）描述内容结构，而非仅用div等通用容器。​

**核心价值**​
- 让代码更易读、维护（人能直观理解内容角色）；​
- 帮助搜索引擎解析页面结构（提升 SEO）；​
- 支持无障碍设备（如屏幕阅读器高效识别内容）。​
- 关键标签：header（头部）、nav（导航）、main（主内容）、article（独立内容）、footer（底部）等，需根据内容实际角色选用。

## HTML 与 HTML5 重点区别

|对比维度     | HTML                                                         | HTML5                                         |
| ------------ | ------------------------------------------------------------ | --------------------------------------------- |
| 文档声明     | 复杂（如 <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"...>） | 简洁（<!DOCTYPE html>）                       |
| 语义化支持   | 依赖 div 加类名（如 class="header"）                       | 提供 header、nav 等专用语义标签           |
| 媒体支持     | 需依赖插件（如 Flash）播放视频音频                           | 原生支持 video、RichMediaReference 标签   |
| 表单功能     | 基础输入类型，需手动实现验证                                 | 新增多种输入类型及内置验证机制                |
| 存储能力     | 主要依赖 Cookie（容量约 4KB）                                | 提供 localStorage、sessionStorage（容量更大） |
| 高级功能支持 | 无绘图、地理位置等原生功能                                   | 内置 Canvas、Geolocation 等 API               |
###  HTML5新 API 与功能

- **本地存储**

 localStorage：持久化存储，数据不会随页面关闭而消失，容量约 5-10MB

```
localStorage.setItem('name', '张三'); // 存储数据
const name = localStorage.getItem('name'); // 获取数据
```

 sessionStorage：会话级存储，数据在页面关闭后清除，仅在当前标签页有效

- **Canvas 绘图**

canvas 标签提供 2D 绘图能力，可用于动态图形、游戏、数据可视化等

```
<canvas id="myCanvas" width="200" height="100"></canvas>
<script>
  const ctx = document.getElementById('myCanvas').getContext('2d');
  ctx.fillStyle = 'blue';
  ctx.fillRect(20, 20, 150, 60); // 绘制矩形
</script>
```

- **地理位置（Geolocation）**

允许网页获取用户的地理位置信息（需用户授权）

```
navigator.geolocation.getCurrentPosition(position => {
  console.log('纬度：', position.coords.latitude);
  console.log('经度：', position.coords.longitude);
});
```

- **拖放（Drag & Drop）**

通过 draggable 属性及相关事件实现元素拖放功能

```
<div draggable="true" ondragstart="handleDragStart(event)">可拖动元素</div>
<div ondragover="handleDragOver(event)" ondrop="handleDrop(event)">放置区域</div>
```

- **其他重要功能**

  **Web Workers**：在后台线程运行脚本，避免阻塞主线程，提升页面响应速度

  **WebSocket**：支持客户端与服务器的全双工通信，适用于实时聊天、在线游戏等场景

### cookie、sessionStorage 和 localStorage 的区别

在 Web 存储中，cookie、sessionStorage 和 localStorage 是三种常见的客户端存储方式，它们在功能、特性和适用场景上有显著区别，具体如下：

| **对比维度**     | **cookie**                                                   | **sessionStorage**                                           | **localStorage**                                             |
| ---------------- | :----------------------------------------------------------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| **存储时效**     | 可设置过期时间（如 24 小时），过期后自动删除；若未设置，则关闭浏览器后失效 | 会话级存储，仅在当前标签页生命周期内有效，关闭标签页 / 浏览器后数据立即清除 | 持久化存储，除非手动删除（如通过代码或浏览器清除），否则永久保留 |
| **存储大小**     | 容量较小，约 4KB                                             | 容量较大，通常为 5-10MB                                      | 容量较大，通常为 5-10MB                                      |
| **数据共享范围** | 同域名下的所有页面（包括不同标签页、窗口）均可共享           | 仅在当前标签页内有效，不同标签页（即使同域名）无法共享       | 同域名下的所有页面（包括不同标签页、窗口）均可共享           |
| **与服务器交互** | 每次 HTTP 请求都会自动携带在请求头中，发送到服务器           | 仅存储在客户端，不与服务器交互                               | 仅存储在客户端，不与服务器交互                               |
| **API 易用性**   | 需要手动封装方法操作（如 document.cookie），API 繁琐         | 提供简洁的 API（setItem/getItem/removeItem/clear）           | 提供简洁的 API（setItem/getItem/removeItem/clear）           |
| **主要使用场景** | 存储身份认证信息（如 token）、用户偏好设置（如主题）等少量关键数据 | 存储临时会话数据（如表单临时输入内容、页面跳转时的临时参数） | 存储长期需要保留的数据（如用户离线数据、本地缓存的列表信息） |

### 补充说明

1. **cookie 的特殊性**

- 可通过服务器响应头 Set-Cookie 设置，也可通过客户端 JavaScript 操作。

- 支持设置 httpOnly 属性（防止 JS 读取，提升安全性）和 secure 属性（仅 HTTPS 传输）

  2.**sessionStorage 的局限**

- 数据仅在当前标签页有效，若通过链接打开新标签页（非 _self 目标），新页面无法共享数据。

- 刷新当前页面时，数据不会丢失；但关闭标签页后彻底清除。

  3.**localStorage 的注意事项**

- 数据存储在客户端，不适合存储敏感信息（如密码）。

- 同域名下的不同页面修改数据时，可通过 storage 事件监听变化。

理解三者的区别有助于在开发中根据场景选择合适的存储方式，例如：用 cookie 存储认证信息，sessionStorage 存储临时表单数据，localStorage 存储用户长期偏好设置。

 **Canvas 与 SVG 的区别**

- Canvas 是像素级绘图（位图），放大后可能失真，适合动态图形、游戏等

- SVG 是矢量图形，放大后不失真，适合图标、地图、图表等

**iframe 的作用及优缺点**

作用

- 在当前页面嵌入另一个独立 HTML 文档，如地图、第三方组件等。
- 优点
- 内容隔离，CSS/JS 互不干扰
- 重复内容复用性高，便于维护
- 直接嵌入第三方内容，简化开发 

缺点

- 增加请求，影响加载性能
- 不利于 SEO，内容难被抓取
- 响应式布局适配困难
- 存在第三方内容的安全风险
