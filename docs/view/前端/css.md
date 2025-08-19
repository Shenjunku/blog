---
title: CSS篇
date: 2022-8-02
sidebar: 'auto'
categories:
 - 前端
tags:
 - 前端
---
### CSS选择器及其优先级

| **选择器**     | **格式**      | **优先级权重** |
| -------------- | ------------- | -------------- |
| id选择器       | #id           | 100            |
| 类选择器       | #classname    | 10             |
| 属性选择器     | a[ref=“eee”]  | 10             |
| 伪类选择器     | li:last-child | 10             |
| 标签选择器     | div           | 1              |
| 伪元素选择器   | li:after      | 1              |
| 相邻兄弟选择器 | h1+p          | 0              |
| 子选择器       | ul>li         | 0              |
| 后代选择器     | li a          | 0              |
| 通配符选择器   | *             | 0              |

对于选择器的**优先级**：

- 标签选择器、伪元素选择器：1
- 类选择器、伪类选择器、属性选择器：10
- id 选择器：100
- 内联样式：1000

**注意事项：**

- !important声明的样式的优先级最高；
- 如果优先级相同，则最后出现的样式生效；
- 继承得到的样式的优先级最低；
- 通用选择器（*）、子选择器（>）和相邻同胞选择器（+）并不在这四个等级中，所以它们的权值都为 0 ；
- 样式表的来源不同时，优先级顺序为：内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式。

### 隐藏元素的方法有哪些

- **display: none**：渲染树不会包含该渲染对象，因此该元素不会在页面中占据位置，也不会响应绑定的监听事件。
- **visibility: hidden**：元素在页面中仍占据空间，但是不会响应绑定的监听事件。
- **opacity: 0**：将元素的透明度设置为 0，以此来实现元素的隐藏。元素在页面中仍然占据空间，并且能够响应元素绑定的监听事件。
- **position: absolute**：通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏。
- **z-index: 负值**：来使其他元素遮盖住该元素，以此来实现隐藏。
- **clip/clip-path** ：使用元素裁剪的方法来实现元素的隐藏，这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。
- **transform: scale(0,0)**：将元素缩放为 0，来实现元素的隐藏。这种方法下，元素仍在页面中占据位置，但是不会响应绑定的监听事件。

## CSS3新特性

##### 边框
 border-radius 圆角 box-shadow盒阴影 border-image 边框图片
##### 圆角
 border-radius属性绘制圆角
##### 渐变 

分为线性渐变（向下/向上/向左/向右/对角方向）和径向渐变（由他们的中心定义）

##### 文本效果

-  text-shadow 文本阴影
-  text-overflow文本溢出包含元素发生的事情  
-  word-wrap 允许对长的不可分割的单词进行分割并换行到下一行。
-  word-break 规定非中日韩文本的换行规则

##### 字体 

CSS3可以使用自己喜欢的字体

##### 2D转换 可以对元素进行移动、缩放、转动、拉长和拉伸

- transform:translate() 移动
- transform:rotae()       旋转
- transform:scale()        缩放
- transform:skew()        转动
- transform:matrix()    matrix 方法有六个参数，包含了上面的功能。

##### 3D转换

- rotaeX控制X轴进行旋转
- rotaeY控制Y轴进行旋转

##### 过渡动画 是指元素从一种样式逐渐改变为另一种的效果

transition: 需要过渡的属性，过渡的时间，时间曲线，延迟时间

##### 动画 是使元素从一种样式逐渐变化为另一种样式的效果。

```
animation: name duration timing-function delay iteration-count direction;
```

animation:动画名称，时间，数度曲线，延迟时间，播放次数，是否反向播放动画

##### 过渡动画和动画的区别

- 动画不需要事件触发，过渡需要事件触发
- 过渡只有一组（两个：开始-结束）关键帧，动画可以设置多个

### 盒模型

所有的HTM元素都可以看做盒子，

盒模型本质上是一个盒子，封装周围的HTML元素，它们包括：边距、边框、填充和实际内容。

盒模型允许我们在其它元素和周围元素边框之间的空间放置元素

![Box-Model.jpg](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/12/16ef8eecacc7feef~tplv-t2oaga2asx-watermark.awebp)

盒子模型分为W3C盒模型和IE模型

- box-sizing:content-box(W3C盒模型，又名标准盒模型)：元素的宽高大小即为内容的大小。
- box-sizing:border-box(IE盒模型，又名怪异盒模型)：元素的宽高+内边距+边框的大小。


### 块元素和行内元素及行内块元素

##### 块元素

- 独占一行
- 可以设置宽高
- 自动换行

常见块元素：div p ul ol li h1~h6 table td tr

可以设置display:block转为块元素

##### 行内元素

- 行内元素可以并行
- 无法设置宽高
- margin上下方向无效，左右有效。
- 不会自动换行

常见行内元素：a,span,strong,i,em,label

可以设置display:inline转为行内元素

##### 行内块元素

- 可以设置宽高
- magin和padding均有效
- 可以并行

常见行内块元素：img,input

可以设置display:inline-block转为行内块元素

### BFC

格式化上下文，是Web页面中盒模型布局的CSS渲染模式，是指一个独立的渲染或者是一个隔离的独立容器

##### 形成BFC的条件

- 浮动元素，float除none以外的值;
- 定位元素，position(absolute,fixed);
- display为以下的值inline-block,table-cell,table-caption;
- overflow除visible以外的值(hidden,auto,scroll)

##### BFC的特性

- 内部的元素会在垂直方向上一个接一个的放置
- 垂直方向上的距离由magin决定
- bfc的区域不会与float的元素区域重叠
- 计算bfc的高度时，浮动元素也会参与计算
- bfc就是页面上的一个独立容器，容器里面的子元素不会影响外面的元素

##### BFC的应用

- 防止margin重叠
- 清除内部浮动
- 自适应两（多）栏布局
- 防止字体环绕

### margin重叠

在css中，两个或多个相邻的盒子（一般都是块元素）在垂直方向上的外边距会发生重叠，这种行为被称为边距折叠

##### 外边距重叠计算规则

- 两个正数的外边，距取最大的边距作为外边距
- 如果一个为正数，一个为负数，最终的外边距是两者之和
- 如果两个外边距都是负数，取两者中绝对值最大作为外边距

##### 解决方法

- 外层元素添加padding
- 外层元素overflow:hidden
- 外层元素透明边框border:1px solid transparent
- 内层元素绝对定位postion:absolute
- 内层元素加float:left或者display:inlin-block

#### margin负边距

- `margin-top` `margin-left`负值，元素向上、向左移动
- `margin-right` 负值 ，右侧元素左移(“后续元素”会被拉向指定方向)，元素自身不变
- `margin-bottom` 负值，右侧元素上移动(“后续元素”会被拉向指定方向), 元素自身不变

### 浮动

css浮动，会使元素向左或者向右移动，其周围的元素也会重新排列

- left-元素浮动到容器的左侧
- right-元素浮动到容器的右侧
- none-元素不会浮动，默认值
- inherit-元素继承其父级的float

##### 如何清除浮动

- 父级添加overflow:hidden或者auto触发BFC
- 浮动元素后添加一个空元素设置属性clear:both
- 给父级元素添加伪类，伪类设置clear:both

### 元素隐藏

- display:none,元素消失并影响页面布局，真正的消失
- opacity:0,不会影响页面布局，还存在页面上，绑定的事件点击也会执行
- visibility:hidden,不会影响页面布局，但是绑定的事件不会执行
- z-index:-1元素在最底层

### 布局

##### 垂直居中布局

``` css
  .box1{
        width: 300px;
        height: 300px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: cornflowerblue;
    }
    .son{
        width: 100px;
        height: 100px;
        background: chocolate;
    }
```

``` css
 .box1{
        width: 300px;
        height: 300px;
        position: relative;
        background: cornflowerblue;
    }
    .son{
        width: 100px;
        height: 100px;
        background: chocolate;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    }
```

``` css
 .box1{
        width: 300px;
        height: 300px;
        position: relative;
        background: cornflowerblue;
    }
    .son{
        width: 100px;
        height: 100px;
        background: chocolate;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto ;
    }
```



##### 两边固定中间自适应

##### 圣杯布局
 
``` css
<style>
    .container {
        height: 100%;
        padding-left: 100px;
        padding-right: 200px;
    }

    .col {
        float: left;
    }

    .main {
        background: lemonchiffon;
        width: 100%;
        height: 100%;
      
    }

    .main_inner {
        /* 处理中间栏的内容被遮盖问题 */
        margin: 0 200px 0 100px;
    }

    .left {
        background: lightcoral;
        width: 100px;
        height: 100%;
        margin-left: -100%;  
        position: relative;
        left: -100px;
        /* 百分比是按父级的宽计算的 */
    }

    .right {
        background: lightgray;
        width: 200px;
        height: 100%;
        margin-left: -200px;
        position: relative;
        right: -200px;
    }
</style>
<body>
    <div class="container">
        <div class="main col ">Main</div>
        <div class="left col ">Left</div>
        <div class="right col ">Right</div>
    </div>
</body>
```



##### 双飞翼布局

``` css 
<style>
    .container {
        height: 100%;
    }

    .col {
        float: left;
    }

    .main {
        background: lemonchiffon;
        width: 100%;
        height: 100%;
    }

    .main_inner {
        /* 处理中间栏的内容被遮盖问题 */
        margin: 0 200px 0 100px;
    }

    .left {
        background: lightcoral;
        width: 100px;
        height: 100%;
        margin-left: -100%;
    }

    .right {
        background: lightgray;
        width: 200px;
        height: 100%;
        margin-left: -200px;
    }
</style>

<body>
    <div class="container">
        <div class="main col ">
            <div class="main_inner">Main</div>
        </div>
        <div class="left col ">Left</div>
        <div class="right col ">Right</div>
    </div>

</body>

```

