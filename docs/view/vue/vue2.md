---
title: vue2
date: 2025-8-02
sidebar: 'auto'
categories:
 - vue
tags:
 - vue
---
## Vue2核心知识点
### 1. 基础核心概念
- **Vue实例：** 通过new Vue({...})创建：通过`new Vue({...})`创建，包含`el`（挂载点）、`data`（数据）、`methods`（方法）等选项。
- **模板语法：**
  - 插值表达式：{{ `变量` }}（文本插值，支持表达式）。
  - 指令：以`v-`开头，如`v-bind`（绑定属性）、`v-on`（绑定事件）、`v-if`（条件渲染）等。
  - 简写：`v-bind:src`→`:src`，`v-on:click`→`@click`。
- **数据响应式**：`data`中的数据会被 Vue 劫持，当数据变化时自动更新视图（核心：`Object.defineProperty`）。

### 2. 响应式原理
- **核心机制**：通过`Object.defineProperty`对`data`中的属性进行 getter/setter 拦截，实现数据变化的检测。
- 限制 ：
  - 对象新增属性默认不响应（需用`Vue.set(obj, key, value)`或`this.$set`）。
  - 数组直接修改索引或长度不响应（需用变异方法：`push`/`pop`/`splice`等，或`Vue.set`）。
- **依赖收集**：每个响应式属性对应一个`Dep`（依赖管理器），收集使用该属性的`Watcher`（观察者），数据变化时通知`Watcher`更新视图。

### 3. 组件化
- 组件注册：
  - 全局注册：`Vue.component('组件名', 组件配置)`（全项目可用）。
  - 局部注册：在组件的`components`选项中声明（仅当前组件可用）。
- 组件通信  ：
  - 父子通信：父传子用`props`，子传父用`$emit`触发自定义事件。
  - 兄弟通信：通过事件总线（`new Vue()`作为中央事件中心，`$on`监听、`$emit`触发）。
  - 跨级通信：`provide`（提供数据）+`inject`（注入数据）（非响应式，适合深层传递）。
- 组件生命周期
  （8 个核心钩子）：
  - 创建阶段：`beforeCreate`（数据未初始化，无`this`）→`created`（数据初始化，可发请求）。
  - 挂载阶段：`beforeMount`（模板编译前）→`mounted`（DOM 渲染完成，可操作 DOM）。
  - 更新阶段：`beforeUpdate`（数据更新，视图未更新）→`updated`（视图更新完成）。
  - 销毁阶段：`beforeDestroy`（实例销毁前，可清理定时器）→`destroyed`（实例销毁完成）。

### 4. 模板与渲染
- 条件渲染：
  - `v-if`：动态添加 / 移除 DOM（适合条件不频繁切换）。
  - `v-show`：通过`display: none`控制显示（适合条件频繁切换）。
- 列表渲染 ：
  - `v-for="(item, index) in list" :key="uniqueValue"`（`key`是必须的，用于优化 Diff 算法）。
  - `key`的作用：标识节点唯一性，避免 DOM 复用导致的问题，提高渲染效率。
- 计算属性与侦听器：
  - 计算属性（`computed`）：基于依赖缓存，仅当依赖变化时重新计算（适合复杂逻辑）。
  - 侦听器（`watch`）：监听数据变化，支持异步操作（适合数据变化后的副作用，如请求接口）。

### 5. 指令与修饰符
- v-model：实现表单元素与数据的双向绑定（本质是`v-bind+v-on`的语法糖）。
  - 修饰符：`.lazy`（失焦同步）、`.number`（转为数字）、`.trim`（去除首尾空格）。
- **事件修饰符**：`.stop`（阻止冒泡）、`.prevent`（阻止默认行为）、`.self`（仅自身触发）、`.once`（只触发一次）。
- **按键修饰符**：`@keyup.enter`（回车触发）、`@keyup.esc`（ESC 键触发）等。

### 6. Vue Router（路由）
- **核心概念**：`router-link`（导航链接）、`router-view`（路由出口）、`$route`（当前路由信息）、`$router`（路由实例方法）。
- **路由配置**：通过`routes`数组定义路由规则（`path`、`component`、`name`等）。
- **动态路由**：`path: '/user/:id'`，通过`$route.params.id`获取参数。
- **嵌套路由**：在`routes`中通过`children`配置子路由，需在父组件中添加`router-view`。
- 路由守卫 ：
  - 全局守卫：`router.beforeEach`（跳转前）、`router.afterEach`（跳转后）。
  - 组件内守卫：`beforeRouteEnter`、`beforeRouteUpdate`、`beforeRouteLeave`。

### 7. Vuex（状态管理）
- 核心概念：
  - `state`：存储共享状态（类似组件的`data`）。
  - `mutations`：修改`state`的唯一方式（同步操作，通过`commit`触发）。
  - `actions`：处理异步操作（通过`dispatch`触发，最终调用`mutations`）。
  - `getters`：类似计算属性，对`state`进行加工（缓存结果）。
  - `modules`：拆分复杂状态（每个模块有独立的`state`/`mutations`等）。
- **工作流程**：组件通过`dispatch`调用`action`→`action`通过`commit`调用`mutation`→`mutation`修改`state`→视图更新。

## 二、常见面试题及答案要点
### 1. Vue2 的响应式原理是什么？
- 核心：通过`Object.defineProperty`对`data`中的属性设置 getter 和 setter，拦截数据的读取和修改。
- 当数据被读取时（getter），收集依赖（`Watcher`）；当数据被修改时（setter），通知依赖更新视图。
- 限制：对象新增属性、数组索引 / 长度修改默认不响应，需用`Vue.set`或数组变异方法。
#### 2. v-if 和 v-show 的区别？
- 实现方式：`v-if`通过添加 / 移除 DOM 元素实现；`v-show`通过`display: none`控制显示。
- 性能消耗：`v-if`切换时有 DOM 操作开销（适合条件少变）；`v-show`初始渲染开销略大（适合条件频繁切换）。
- 编译时机：`v-if`是 “真正” 的条件渲染（惰性，初始条件为假时不渲染）；`v-show`无论初始条件如何，都会渲染。
#### 3. v-for 中 key 的作用？
- 标识列表中每个节点的唯一性，帮助 Vue 的 Diff 算法快速识别变化的节点。
- 避免 DOM 节点被错误复用（如表单输入值错乱）。
- 建议使用唯一且稳定的值（如 ID）作为 key，不推荐用 index（可能导致 Diff 效率低）。
#### 4. 计算属性（computed）和侦听器（watch）的区别？
- 缓存：`computed`依赖不变则缓存结果；`watch`无缓存，数据变化即触发。
- 场景：`computed`适合 “根据已有数据计算新数据”（如筛选列表）；`watch`适合 “数据变化后执行异步 / 复杂操作”（如数据变化后请求接口）。
- 写法：`computed`是函数 / 对象（有`get`/`set`）；`watch`是对象（配置`handler`、`deep`、`immediate`等）。
#### 5. 组件通信有哪些方式？
- 父子通信：`props`（父→子）+ `$emit`（子→父）。
- 兄弟通信：事件总线（`new Vue()`作为中间件，`$on`监听 +`$emit`触发）。
- 跨级通信：`provide`+`inject`（非响应式，适合深层传递）。
- 全局状态：Vuex（适合复杂项目的多组件共享状态）。
#### 6. Vue 的生命周期钩子在实际开发中如何使用？
- `created`：初始化数据（如请求接口获取初始数据）。
- `mounted`：操作 DOM（如初始化第三方插件，需基于渲染后的 DOM）。
- `beforeDestroy`：清理资源（如清除定时器、解绑事件监听，避免内存泄漏）。
- `updated`：数据更新后执行 DOM 操作（需注意避免无限循环）。
#### 7. Vuex 中 mutation 和 action 的区别？
- 同步 vs 异步：`mutation`只能是同步操作；`action`可以包含异步操作（如请求接口）。
- 调用方式：`mutation`通过`store.commit('mutation名')`调用；`action`通过`store.dispatch('action名')`调用。
- 职责：`mutation`直接修改`state`；`action`不能直接修改`state`，需通过调用`mutation`实现。
#### 8. 路由守卫有哪些？使用场景？
- 全局守卫：`router.beforeEach`（登录验证，未登录跳转到登录页）。
- 路由独享守卫：`beforeEnter`（特定路由的权限控制）。
- 组件内守卫：`beforeRouteLeave`（离开组件前提示未保存的内容）。
- 作用：控制路由跳转权限、处理页面离开前的逻辑（如保存表单）。