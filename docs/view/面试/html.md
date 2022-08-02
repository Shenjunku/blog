---
title: HTML篇
date: 2022-8-01
categories:
 - HTML
tags:
 - 面试
---
### 1、HTM5新特性

##### 标签语义化

例如header代表文档头部区域nav代表导航栏section代表块、段区域footer代表底部区域等标签

##### 多媒体

视频和音频videoaudio标签

表单的增强

##### Web存储：localStorage和sessionStorage

localStorage:永久保存数据，没有过期时间，除非手动删除。

sessionStorage:临时保存数据，游览器窗口消失后就会删除数据。

画布canvas和svg矢量图

拖放

##### 地理位置，

使用getCurrentPosition方法来获取用的的位置

##### Web Worker

可以创造多线程环境，允许主线程创建Woker线程，将一些任务分配给后者运行，在主线程运行的同时，Worker线程在后台运行，两者互不干扰。等到Worker线程完成任务后，再把结果返回给主线程。

##### WebSocket

是一种网络通信协议，WebSocket最大的特点就是服务器可以主动向客户端推送消息，客户端也可以主动向服务器端推送消息。
