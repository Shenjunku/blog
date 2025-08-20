---
title: vue3
date: 2025-8-02
sidebar: 'auto'
categories:
 - vue
tags:
 - vue
---
## 一、Vue3 核心知识点
### 1. 响应式系统
- 基于`Proxy`实现，替代 Vue2 的`Object.defineProperty`
- 支持监听对象新增属性、删除属性、数组索引 / 长度修改
- 天然支持`Map`、`Set`等复杂数据结构
- 核心 API：`reactive`（对象响应式）、`ref`（基础类型响应式）、`toRefs`（解构响应式对象）
### 2. Composition API（组合式 API）
- 以函数为核心组织逻辑，替代 Vue2 的 Options API（data/methods 等）
- 入口函数`setup()`：组件初始化前执行，返回值暴露给模板
- 生命周期钩子：`onMounted`、`onUpdated`等（需在 setup 中调用）
- 逻辑复用：通过自定义 Hook（如`useRequest`）提取可复用逻辑
### 3. 模板与指令增强
- 支持多根节点（无需包裹在单个 div 中）
- `v-model`重构：支持多绑定（如`v-model:title`），替代`.sync`修饰符
- `v-if`与`v-for`优先级：v-if 优先级高于 v-for（Vue2 相反）
- 新增`v-memo`：缓存模板片段，优化渲染性能
### 4. 组件通信
- `defineProps`：声明接收的 props（替代 Vue2 的 props 选项）
- `defineEmits`：显式声明触发的事件（替代 Vue2 的 $emit）
- `provide/inject`：支持响应式数据传递（Vue2 中是非响应式）
- 移除`$on`/`$off`：不再支持事件总线（推荐用 Pinia 或外部库）
### 5. 其他重要特性
- `Teleport`：将组件内容渲染到指定 DOM 节点（如模态框到 body）
- `Suspense`：处理异步组件加载状态（配合`defineAsyncComponent`）
- 全局 API 调整：`createApp()`替代`new Vue()`，支持链式调用
### 6. 生态升级
- Vue Router 4：支持 Composition API，路由配置更灵活
- Pinia：替代 Vuex，简化状态管理（无 mutations，天然支持 TS）
- Vite：官方构建工具，开发时无需打包，启动速度极快
## 二、Vue3 与 Vue2 的核心区别

| 维度            | Vue2                        | Vue3                                   |
| --------------- | --------------------------- | -------------------------------------- |
| 响应式原理      | Object.defineProperty       | Proxy                                  |
| 核心 API 风格   | Options API（配置式）       | Composition API（组合式）+ Options API |
| 模板根节点      | 必须单个根节点              | 支持多根节点                           |
| 生命周期        | beforeCreate/created 等选项 | onMounted 等函数（setup 中调用）       |
| 状态管理        | Vuex（需 mutations）        | Pinia（无 mutations，更简洁）          |
| 性能优化        | 基础优化                    | 虚拟 DOM 重写、静态提升、Tree-shaking  |
| TypeScript 支持 | 需额外配置                  | 原生支持                               |
| 事件总线        | 支持*o**n*/off              | 移除（需手动实现）                     |

## 三、常见面试题及解析

### 1. Vue3 的响应式原理为什么比 Vue2 更优？

- **Vue2 缺陷**：`Object.defineProperty`无法监听对象新增属性、删除属性和数组索引修改，需通过`$set`手动触发更新。
- **Vue3 改进**：使用`Proxy`代理整个对象，能拦截所有属性操作（包括新增、删除），天然支持数组索引修改，无需额外 API。
- **依赖收集**：Vue3 通过`effect`函数自动收集依赖，触发更新更精准。
- **性能优化**：Vue3 重写了虚拟 DOM 渲染过程，静态节点标记更智能，渲染效率更高。
### 2. Composition API 相比 Options API 的优势？
- **逻辑组织**：相关逻辑可聚合在同一函数中（如表单处理的变量和方法），解决 Vue2 中逻辑分散在 data/methods 的问题。
- **逻辑复用**：通过自定义 Hook（如`useUser`）复用逻辑，替代 Vue2 的 mixin（避免命名冲突和来源模糊）。
- **类型支持**：更适合 TypeScript，类型推断更准确，减少类型声明冗余。
- **灵活性**：可根据业务逻辑自由组织代码，不受选项限制。
### 3. ref 和 reactive 的使用场景及区别？

- ref  ：用于基本类型（number/string 等）和单值对象，通过.value访问值，模板中自动解包。
  ```javascript
  const count = ref(0)
  count.value++ // 必须用.value修改
  ```
- reactive：用于复杂对象，直接访问属性，无需.value，但不能直接赋值（会丢失响应式）。
  ```javascript
  const user = reactive({ name: 'vue' })
  user.name = 'vue3' // 正确
  user = { age: 3 }  // 错误，会丢失响应式
  ```
- **选择原则**：基本类型用 ref，对象类型用 reactive；需要解构响应式对象时，用`toRefs`处理 reactive 对象。
### 4. Vue3 的生命周期与 Vue2 有何不同？
- **移除的钩子**：`beforeCreate`和`created`被`setup()`替代（setup 执行时机相当于这两个钩子）。
- **钩子更名**：`beforeDestroy`→`onBeforeUnmount`，`destroyed`→`onUnmounted`。
- **使用方式**：Vue3 中生命周期钩子需从 vue 导入并在 setup 中调用，Vue2 中是选项配置。
 ```javascript
// Vue3
import { onMounted } from 'vue'
setup() {
  onMounted(() => { console.log('挂载完成') })
}

// Vue2
export default {
  mounted() { console.log('挂载完成') }
}
 ```
### 5. Pinia 与 Vuex 的区别？
- **核心差异**：Pinia 移除了 mutations，直接在 actions 中修改状态（支持同步和异步）。
- **模块化**：Pinia 无需嵌套模块，通过`defineStore`创建多个 store 实现模块化。
- **类型支持**：Pinia 天然支持 TypeScript，无需额外类型声明；Vuex 需手动定义类型。
- **API 简化**：Pinia 的 store 调用更直接（`store.count++`），Vuex 需`commit`/`dispatch`。
### 6. Vue3 的性能优化体现在哪些方面？
- **虚拟 DOM 优化**：重写虚拟 DOM 对比算法，减少不必要的节点比对。
- **静态提升**：模板中的静态节点（如纯文本）只创建一次，复用渲染。
- **事件缓存**：相同事件处理函数（如`@click="handleClick"`）会被缓存，避免重复创建。
- **Tree-shaking**：未使用的 API（如过滤器）会被打包工具移除，减小体积。
- **按需编译**：模板编译时标记静态节点，运行时跳过比对。
### 7. Vue3 中如何实现组件通信？
- **父子通信**：`defineProps`接收父组件数据，`defineEmits`触发事件向父组件传递数据。
 ```javascript
// 子组件
const props = defineProps({ name: String })
const emit = defineEmits(['update'])
emit('update', 'newValue')
 ```
- **跨级通信**：`provide`提供数据，`inject`注入数据（支持响应式）。
- **全局状态**：用 Pinia 管理跨组件共享状态（替代 Vuex）。
- **兄弟通信**：通过共同父组件转发，或用 Pinia 存储共享数据。