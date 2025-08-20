---
title: vue2和3的区别
date: 2025-8-02
sidebar: 'auto'
categories:
 - vue
tags:
 - vue
---
## 一、响应式系统：从 "defineProperty" 到 "Proxy" 的飞跃
响应式系统是 Vue 框架的核心，也是 Vue3 变化最大的部分之一。
### Vue2 的响应式实现
Vue2 使用`Object.defineProperty` API 实现响应式，其工作原理是：
- 遍历 data 中的所有属性，为每个属性设置 getter 和 setter
- 当属性被访问时（getter），收集依赖（Watcher）
- 当属性被修改时（setter），通知依赖更新
这种实现存在几个明显缺陷：
- 无法监听对象新增属性或删除属性，需要通过`Vue.set`或`this.$set`手动处理
- 无法监听数组通过索引修改或改变长度的操作，只能通过重写的数组方法（push、pop 等）触发更新
- 初始化时需要递归遍历所有属性，对于大型对象性能开销较大
### Vue3 的响应式革新
Vue3 采用 ES6 的`Proxy` API 重构了响应式系统：
- 直接代理整个对象，而非逐个属性
- 天然支持监听对象新增 / 删除属性、数组索引操作
- 支持 Map、Set 等复杂数据结构的响应式处理
- 懒代理：只在访问属性时才进行代理，提升初始化性能
```javascript
// Vue2响应式局限示例
const vm = new Vue({
  data: { user: { name: 'Vue2' } }
})
vm.user.age = 3 // 新增属性，不会触发更新
vm.$set(vm.user, 'age', 3) // 必须使用$set

// Vue3响应式优势示例
const user = reactive({ name: 'Vue3' })
user.age = 3 // 直接新增属性，自动响应式
```
## 二、API 风格：Options API vs Composition API

Vue3 引入的 Composition API 是对 Vue 开发模式的重大革新，与 Vue2 的 Options API 形成鲜明对比。

### Vue2 的 Options API

Vue2 采用基于选项的 API 风格，开发者需要将代码按照功能分散到不同选项中：

- data：存储响应式数据
- methods：定义方法
- computed：计算属性
- watch：监听器
- 生命周期钩子：如 mounted、updated 等

这种方式的缺点是：

- 相关逻辑分散在不同选项中，大型组件代码会变得难以维护（"面条代码" 问题）
- 逻辑复用困难，mixin 存在命名冲突和来源模糊的问题
```javascript
// Vue2 Options API示例
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() { this.count++ }
  },
  mounted() {
    console.log('组件挂载完成')
  }
}
```
### Vue3 的 Composition API

Vue3 的 Composition API 基于函数式编程思想，允许开发者按逻辑相关性组织代码：

- `setup()`：组件入口点，替代了 data 和部分生命周期
- 响应式 API：`ref`、`reactive`创建响应式数据
- 生命周期钩子：`onMounted`、`onUpdated`等函数式钩子
- 逻辑复用：通过自定义 Hook（如`useUser`、`useCart`）提取可复用逻辑
```javascript
// Vue3 Composition API示例
export default {
  setup() {
    const count = ref(0)
    
    const increment = () => {
      count.value++
    }
    
    onMounted(() => {
      console.log('组件挂载完成')
    })
    
    return { count, increment }
  }
}
```
Composition API 的优势：

- 更好的代码组织，相关逻辑可以聚合在一起
- 更灵活的逻辑复用，避免 mixin 的缺陷
- 更好的 TypeScript 支持
- 更小的生产包体积（支持 Tree-shaking）

## 三、模板语法：更灵活的书写方式

Vue3 对模板语法进行了多处增强，提供了更灵活的编码体验，同时修复了 Vue2 中的一些反直觉行为。下面通过实际案例展示两者的区别：

### 1. 多根节点支持（片段）

**Vue2 限制**：模板必须有且仅有一个根节点，否则会报错。这导致很多时候需要用无意义的`<div>`包裹内容。
```html
<!-- Vue2 错误示例 -->
<template>
  <header>网站头部</header>
  <main>网站主体</main>
  <footer>网站底部</footer>
</template>
<!-- 运行时会报错：Component template should contain exactly one root element -->

<!-- Vue2 正确但冗余的写法 -->
<template>
  <div class="wrapper"> <!-- 无意义的包裹层 -->
    <header>网站头部</header>
    <main>网站主体</main>
    <footer>网站底部</footer>
  </div>
</template>
```
**Vue3 改进**：支持多根节点（片段），无需冗余包裹：

```html
<!-- Vue3 正确写法 -->
<template>
  <header>网站头部</header>
  <main>网站主体</main>
  <footer>网站底部</footer>
</template>
```

这一改进减少了不必要的 DOM 层级，使 HTML 结构更清晰。

### 2. v-model 重构与多绑定支持

**Vue2 的双向绑定限制**：需要结合`.sync`修饰符处理多属性双向绑定，语法不一致。

```html
<!-- Vue2 多属性双向绑定 -->
<user-profile 
  :name="username"
  @update:name="username = $event"
  :email.sync="userEmail"  <!-- 使用.sync修饰符 -->
/>

<!-- Vue2 组件内部实现 -->
<script>
export default {
  props: ['name', 'email'],
  methods: {
    updateName(newName) {
      this.$emit('update:name', newName)  // 普通v-model方式
    },
    updateEmail(newEmail) {
      this.$emit('update:email', newEmail)  // .sync本质也是触发update事件
    }
  }
}
</script>
```

**Vue3 的统一方案**：用`v-model:prop`语法统一处理多属性双向绑定：

```html
<!-- Vue3 多v-model绑定 -->
<user-profile 
  v-model:name="username"
  v-model:email="userEmail"
/>

<!-- Vue3 组件内部实现 -->
<script setup>
const props = defineProps(['name', 'email'])
const emit = defineEmits(['update:name', 'update:email'])

const updateName = (newName) => {
  emit('update:name', newName)
}

const updateEmail = (newEmail) => {
  emit('update:email', newEmail)
}
</script>
```

Vue3 的方案更直观，减少了语法记忆负担。

### 3. v-if 与 v-for 优先级调整

**Vue2 的问题**：v-for 优先级高于 v-if，可能导致性能问题。

```html
<!-- Vue2 示例 -->
<ul>
  <!-- 问题：会先循环所有项，再判断是否显示，浪费性能 -->
  <li v-for="user in users" v-if="user.isActive" :key="user.id">
    {{ user.name }}
  </li>
</ul>

<!-- Vue2 正确做法：先过滤数据 -->
<ul>
  <li v-for="user in activeUsers" :key="user.id">
    {{ user.name }}
  </li>
</ul>

<script>
export default {
  data() {
    return { users: [...] }
  },
  computed: {
    activeUsers() {
      return this.users.filter(user => user.isActive)
    }
  }
}
</script>
```

**Vue3 的改进**：v-if 优先级高于 v-for，更符合逻辑预期。

```html
<!-- Vue3 示例 -->
<ul>
  <!-- 现在v-if先判断列表是否存在，再决定是否循环 -->
  <li v-for="user in users" v-if="users.length > 0" :key="user.id">
    {{ user.name }}
  </li>
  <li v-else>
    没有数据
  </li>
</ul>
```

### 4. 插槽语法简化

**Vue2 的插槽语法**：区分普通插槽和作用域插槽，写法不一致。

```html
<!-- Vue2 普通插槽 -->
<modal>
  <template slot="header">
    弹窗标题
  </template>
  
  <!-- 作用域插槽 -->
  <template slot="body" slot-scope="props">
    {{ props.content }}
  </template>
</modal>
```

**Vue3 的统一语法**：用`v-slot`（可简写为`#`）统一所有插槽，作用域插槽更直观。

```html
<!-- Vue3 插槽用法 -->
<modal>
  <template v-slot:header>  <!-- 普通插槽 -->
    弹窗标题
  </template>
  
  <!-- 作用域插槽，可解构参数 -->
  <template #body="{ content }">
    {{ content }}
  </template>
</modal>

<!-- 甚至可以直接写在组件标签上（单插槽情况） -->
<data-list #default="{ items }">
  <div v-for="item in items" :key="item.id">{{ item.name }}</div>
</data-list>
```

### 5. 新增 v-memo 指令（Vue3 独有）

Vue3 新增`v-memo`指令，用于缓存模板片段，优化渲染性能，这是 Vue2 没有的功能。

```html
<!-- Vue3 v-memo示例：优化列表渲染 -->
<div v-memo="[searchQuery, currentPage]">
  <div v-for="item in filteredItems" :key="item.id">
    {{ item.name }} - {{ item.price }}
  </div>
</div>

<script setup>
const searchQuery = ref('')
const currentPage = ref(1)
const items = ref([...])

// 计算属性：过滤并分页
const filteredItems = computed(() => {
  return items.value
    .filter(item => item.name.includes(searchQuery.value))
    .slice((currentPage.value - 1) * 10, currentPage.value * 10)
})
</script>
```

上面案例中，只有当`searchQuery`或`currentPage`变化时，列表才会重新渲染，避免了无关数据变化导致的性能损耗。

## 四、性能优化：全方位的提升

Vue3 在性能方面做了大量优化，相比 Vue2 有显著提升：

1. **虚拟 DOM 重写**
   - Vue3 的虚拟 DOM 采用了更高效的算法，减少了不必要的节点比对
   - 编译时会标记静态节点，运行时跳过这些节点的比对
2. **静态提升**
   - 模板中的静态内容（如纯文本、无绑定的元素）会被提升到渲染函数之外
   - 这些内容只会创建一次，后续渲染直接复用
3. **事件缓存**
   - 相同的事件处理函数会被缓存，避免每次渲染都创建新函数
   - 如`@click="handleClick"`会被优化为缓存函数
4. **更小的运行时体积**
   - 通过 Tree-shaking 移除未使用的 API，比 Vue2 体积减少约 40%
   - 移除了一些不常用特性，如过滤器（推荐用计算属性替代）
5. **按需编译**
   - 模板编译时进行更多优化处理，生成更高效的渲染代码
   - 针对不同场景（如是否有 v-if、v-for）生成定制化代码

根据官方测试，Vue3 的性能相比 Vue2 提升约 55%，内存使用减少约 54%。