---
title: websocket
date: 2022-8-01
sidebar: 'auto'
categories:
 - 前端
tags:
 - 前端
---
## 客户端（浏览器）使用方法
浏览器原生支持 WebSocket API，无需额外依赖，核心步骤包括：建立连接、发送 / 接收消息、处理连接事件。
```javascript

// 1. 建立WebSocket连接（ws://非加密，wss://加密，类似http/https）
const ws = new WebSocket('ws://localhost:8080');

// 2. 连接成功回调
ws.onopen = function() {
  console.log('WebSocket连接已建立');
  // 发送消息到服务器
  ws.send('客户端已连接');
};

// 3. 接收服务器消息
ws.onmessage = function(event) {
  console.log('收到服务器消息:', event.data);
  // 消息可能是文本或二进制数据
  if (typeof event.data === 'string') {
    // 处理文本消息
  } else if (event.data instanceof Blob) {
    // 处理二进制数据（如图片、文件）
  }
};

// 4. 连接关闭回调
ws.onclose = function(event) {
  console.log('连接关闭，代码:', event.code, '原因:', event.reason);
  // 可尝试重连
  if (event.code !== 1000) { // 1000表示正常关闭
    setTimeout(() => { /* 重连逻辑 */ }, 3000);
  }
};

// 5. 错误处理
ws.onerror = function(error) {
  console.error('WebSocket错误:', error);
};

// 6. 主动关闭连接（可选）
// ws.close(1000, '正常关闭'); // 1000是标准关闭码
```
#### 2. 关键 API 说明
- **`new WebSocket(url)`**：创建连接，`url` 格式为 `ws://domain:port` 或 `wss://domain:port`（加密）。
- **`ws.send(data)`**：发送数据，支持字符串、`Blob`、`ArrayBuffer` 等类型。
- 事件回调 ：
  - `onopen`：连接成功时触发。
  - `onmessage`：收到服务器消息时触发（`event.data` 为消息内容）。
  - `onclose`：连接关闭时触发（`event.code` 为关闭码，`event.reason` 为原因）。
  - `onerror`：发生错误时触发。

### 心跳检测（防止连接超时）
部分服务器会断开长时间无数据的连接，可通过定时发送心跳包维持连接：
```javascript
// 客户端心跳逻辑
let heartBeatTimer;
ws.onopen = function() {
  // 每30秒发送一次心跳
  heartBeatTimer = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send('ping'); // 发送心跳标识
    }
  }, 30000);
};

ws.onclose = function() {
  clearInterval(heartBeatTimer); // 关闭时清除定时器
};

// 服务器收到"ping"后回复"pong"（保持连接）
```
### 注意事项

1. **连接安全性**：生产环境必须使用 **`wss://`**（基于 TLS/SSL 加密），避免 `ws://`（明文传输）导致数据被窃听或篡改。`wss` 的默认端口是 443，与 HTTPS 一致，可规避部分防火墙拦截。
2. **重连机制**：网络不稳定时，客户端需实现重连逻辑（如 `setTimeout` 重试）。
3. **数据格式**：通常使用 JSON 传输结构化数据（需 `JSON.stringify` 和 `JSON.parse` 处理）。
4. **兼容性**：现代浏览器均支持 WebSocket，IE 需 IE10+。但老旧环境（如 IE9 及以下）不支持，需通过 **轮询**（Polling）或 **长轮询**（Long Polling）降级处理。
5. **服务器压力**：长连接会占用服务器资源，需合理设置连接超时和心跳检测。

## WebSocket 和 HTTP 协议有什么区别
WebSocket 和 HTTP 的主要区别：

连接特性

- HTTP 是短连接：每次请求都需要建立新的 TCP 连接（除非使用 keep-alive）
- WebSocket 是持久化的长连接：只需要一次握手，后续可以持续通信

通信方式

- HTTP 是单向通信：客户端请求，服务器响应
- WebSocket 是双向通信：客户端和服务器都可以主动发送数据

数据格式

- HTTP 每次请求都要带完整的 HTTP 头
- WebSocket 第一次握手完成后，后续数据传输只需要很小的头部

应用场景

- HTTP 适合一次性的数据交互
- WebSocket 适合实时性要求高的场景，如：
  - 实时聊天
  - 游戏实时数据
  - 实时协作文档

性能

- WebSocket 的性能和效率通常优于 HTTP 轮询
- WebSocket 可以更好地节省服务器资源和带宽

支持性

- HTTP 被所有浏览器支持
- WebSocket 需要浏览器支持（现代浏览器普遍已支持）

| 特性       | HTTP                     | WebSocket                |
| ---------- | ------------------------ | ------------------------ |
| 通信模式   | 单向（请求 - 响应）      | 双向（全双工）           |
| 连接状态   | 短连接（或复用的长连接） | 持久化长连接             |
| 数据效率   | 头部冗余多，效率低       | 头部精简，效率高         |
| 服务器推送 | 不支持（需轮询模拟）     | 原生支持                 |
| 适用场景   | 非实时请求（如接口调用） | 实时通信（如聊天、直播） |

