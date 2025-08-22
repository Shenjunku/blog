---
title: TS类型
date: 2022-8-03
sidebar: 'auto'
categories:
 - ts
tags:
 - ts
---

### TS 类型

| 类型类别        | 具体类型                          | 说明和示例                                                   |
| --------------- | --------------------------------- | ------------------------------------------------------------ |
| **基础类型**    | `number`                          | 数字（整数、浮点数、NaN 等） `let age: number = 25`          |
|                 | `string`                          | 字符串（单引号、双引号、模板字符串） `let name: string = "Alice"` |
|                 | `boolean`                         | 布尔值（`true` 或 `false`） `let isActive: boolean = true`   |
|                 | `null`                            | 表示空值（仅包含 `null`） `let empty: null = null`           |
|                 | `undefined`                       | 表示未定义（仅包含 `undefined`） `let unassigned: undefined = undefined` |
|                 | `symbol`                          | 唯一不可变的值（ES6+） `const key: symbol = Symbol("id")`    |
|                 | `bigint`                          | 大整数（超出 `number` 范围） `let big: bigint = 100n`        |
| **复合类型**    | 数组（`类型[]` 或 `Array<类型>`） | 约束元素类型的数组 `let nums: number[] = [1, 2, 3]`          |
|                 | 对象（显式结构）                  | 固定属性及类型的对象 `let user: { name: string; age: number } = { name: "Bob", age: 30 }` |
|                 | 接口（`interface`）               | 复用对象结构定义 `interface Person { name: string; age?: number }` |
|                 | 函数                              | 声明参数和返回值类型 `function add(a: number, b: number): number { return a + b }` |
| **TS 特有类型** | 联合类型（`A | B`）               | 值可以是多种类型之一 `let result: number | string = "success"` |
|                 | 交叉类型（`A & B`）               | 合并多个类型特性 `type C = { x: number } & { y: string }`    |
|                 | 类型别名（`type`）                | 自定义类型名称 `type Data = string | number`                 |
|                 | 泛型（`<T>`）                     | 类型复用，支持动态类型 `function identity<T>(val: T): T { return val }` |
|                 | 枚举（`enum`）                    | 命名常量集合 `enum Direction { Up, Down, Left, Right }`      |
|                 | 元组（`tuple`）                   | 固定长度和类型的数组 `let tuple: [string, number] = ["age", 25]` |
| **特殊类型**    | `any`                             | 关闭类型检查，任意类型 `let value: any = "hello"; value = 10` |
|                 | `unknown`                         | 安全版 `any`，需确认类型后使用 `let val: unknown = "test"; if (typeof val === "string") { val.length }` |
|                 | `void`                            | 函数无返回值 `function log(): void { console.log("message") }` |
|                 | `never`                           | 函数永不返回（如抛出错误） `function throwErr(): never { throw new Error() }` |

### 复合类型

### 1. 数组（Array）

**含义**：由相同类型元素组成的有序集合，TS 对数组元素类型进行严格约束。
**用法**：
- 语法 1：`元素类型[]`
- 语法 2：`Array<元素类型>`（泛型形式）
```typescript
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];
```
### 2. 对象（Object）

**含义**：键值对集合，TS 可显式声明对象的属性类型和结构，确保属性的存在性和类型正确性。
**用法**：直接声明属性名和类型，或通过接口 / 类型别名复用结构。
```typescript
let user: { name: string; age: number } = { name: "Alice", age: 30 };
```
### 3. 接口（Interface）

**含义**：用于定义对象的**结构规范**（属性、方法及其类型），可被多个对象复用，是 TS 中描述对象类型的核心方式。
**作用**：抽象对象的公共结构，实现类型约束和代码复用。
**用法**：
- 定义接口：`interface 接口名 { 属性名: 类型; }`
- 实现接口：`class 类名 implements 接口名 { ... }`
```typescript
interface Person {
  name: string;
  age: number;
}
let user: Person = { name: "Bob", age: 25 };
```
### 4. 函数（Function）

**含义**：可执行的代码块，TS 允许声明函数的参数类型、返回值类型，确保调用时的参数匹配和返回值正确。
**用法**：

- 函数声明时指定参数和返回值类型
- 用类型别名定义函数类型
```typescript
// 函数声明（参数 a、b 为 number，返回值为 number）
function add(a: number, b: number): number {
  return a + b;
}
// 函数类型别名（复用函数类型定义）
type MathOperation = (x: number, y: number) => number;
const multiply: MathOperation = (x, y) => x * y;
// 错误示例：参数类型不匹配
add("1", 2); // 编译报错（参数 "1" 不是 number 类型
```

### 特有高级类型

### 1. 联合类型（Union Types）

**含义**：表示一个值可以是多种类型中的**一种**（用 `|` 分隔多个类型）。
**作用**：处理 “值可能有多种类型” 的场景，如函数参数允许字符串或数字。
**用法示例**：
```typescript
function printId(id: number | string) {
  console.log(id);
}
printId(101); // 输出: 101
printId("202"); // 输出: 202
```
### 2. 交叉类型（Intersection Types）

**含义**：将多个类型**合并为一个新类型**，新类型包含所有原类型的属性和方法（用 `&` 分隔）。
**作用**：实现类型的 “组合”，如合并两个接口的结构。
**用法示例**： 
```typescript
interface Person {
  name: string;
}
interface Age {
  age: number;
}
type PersonAge = Person & Age; // 合并 Person 和 Age 的属性
let person: PersonAge = { name: "Alice", age: 30 };
```
### 3. 类型别名（Type Alias）

**含义**：用 `type` 关键字给一个类型起**别名**，便于复用复杂类型。
**作用**：简化长类型定义，提高代码可读性（类似 “变量名” 之于 “值”）。
**用法示例**： 
```typescript
type Point = {
  x: number;
  y: number;
};
let p: Point = { x: 10, y: 20 };
```
### 4. 泛型（Generics）

**含义**：一种 “类型变量” 机制，允许在定义函数、类、接口时**延迟指定具体类型**，调用时再传入实际类型。
**作用**：实现 “类型复用”，同时保持类型安全（避免使用 `any` 丢失类型检查）。
**用法示例**：
```typescript
function identity<T>(arg: T): T {
  return arg;
}
let output1 = identity<string>("myString"); // output1 类型为 string
let output2 = identity<number>(100); // output2 类型为 number
```
### 5. 枚举（Enum）

**含义**：用 `enum` 关键字定义**一组命名的常量**，便于管理相关的固定值集合。
**作用**：替代魔术数字 / 字符串，提高代码可读性和可维护性（JS 无原生枚举，TS 编译后转为对象）。
**用法示例**：
```typescript
enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green; // c 的值为 1
```
### 6. 元组（Tuple）

**含义**：一种**固定长度和类型**的数组，各元素类型可以不同（JS 数组长度和类型可变，TS 元组是其严格约束版本）。
**作用**：表示 “结构固定” 的数据，如坐标、键值对。
**用法示例**：
```typescript
let tuple: [string, number] = ["age", 25]; // 第一个元素必须是 string，第二个是 number
```

### 特殊类型
1. `any`：关闭类型检查，变量可以是任意类型（兼容 JS 动态类型）
   ```typescript
   let random: any = 10;
   random = "string";
   random = true; // 均合法，无类型检查
   ```
2. `unknown`：安全版 `any`，必须先确认类型才能使用
   ```typescript
   let value: unknown = "hello";
   if (typeof value === "string") {
     value.toUpperCase(); // 合法（已确认是 string 类型）
   }
   ```
3. `void`：表示函数无返回值（或返回 `undefined`）
   ```typescript
   function log(message: string): void {
     console.log(message); // 无 return 或 return undefined
   }
   ```
4. `never`：表示函数永不返回（如抛出错误或无限循环）
   ```typescript
   function throwError(message: string): never {
     throw new Error(message); // 永远不会执行完
   }
   ```
5. `tuple`（元组）：固定长度和类型的数组（TS 特有）
   ```typescript
   let tuple: [string, number] = ["age", 25]; // 第一个元素必须是 string，第二个是 number
   ```

### 数组 Array 和元组 Tuple 的区别 
数组元素只能有一种类型，元祖元素可以有多种类型。
数组长度可以改变，元组长度固定。
```ts
// 数组，两种定义方式
const list1: number[] = [1, 2, 3]
const list2: Array<string> = ['a', 'b', 'c']

// 元组
let x: [string, number] = ['x', 10]
```