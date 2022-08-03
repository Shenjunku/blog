---
title: js篇
date: 2022-8-02
sidebar: 'auto'
categories:
 - js
tags:
 - 面试
---
### JavaScript

#### var、let、 const的区别

var 变量提升

```
var a='沈'
等于下方的代码
var a;
a=沈;
```

let 禁止重复声明,不存在变量提升，具有块级作用域

const 具有let的特性，声明的基本类型后不能改变值，但是如果是引用类型可以修改其中的属性

##### var 声明的变量挂在window,let和const声明的不在window,所以let 和const不存在变量提升，let 和const存储在语法环境,var 存储在变量环境这是它们之间存在差异的原因

没有用var声明的变量都是全局变量，而且是顶层对象的属性

##### 执行上下文

执行上下文是当前 JavaScript 代码被解析和执行时所在环境的抽象概念

```
ExecutionContext = {  
  ThisBinding = <this value>,     // 确定this 
  LexicalEnvironment = { ... },   // 词法环境
  VariableEnvironment = { ... },  // 变量环境
}
在 ES6 中，词法 环境和 变量 环境的区别在于前者用于存储**函数声明和变量（ let 和 const ）绑定，而后者仅用于存储变量（ var ）**绑定
```

#### 数据类型

原始类型：string、number、boolean、null、undefined、symbol(ES10 BigInt)

引用类型:object(function、array)

##### 判断数据类型

- typeof主要判断原始类型，但是不能将Object、Array和Null区分，都返回object；
- instanceof主要判断引用类型，能够区分Array、Object和Function，但是Number，Boolean，String基本数据类型不能判断
- Object.prototype.toString.call()可以判断所有类型

##### null和undefined的区别

undefined类型只有一个值，即undefined

- 变量被声明了，但没有赋值时，就等于undefined。
- 调用函数时，应该提供的参数没有提供，该参数等于undefined。
- 对象没有赋值的属性，该属性的值为undefined。
- 函数没有返回值时，默认返回undefined。

Null类型也只有一个值，即null。null用来表示尚未存在的对象,常用来表示函数企图返回一个不存在的对象。

- 作为函数的参数，表示该函数的参数不是对象。
- 作为对象原型链的终点。

#### 定义函数的方法

##### 函数声明

```
//ES5
function getSum(){}
```

##### 函数表达式

```
//ES5
var getSum=function(){}
//ES6
let getSum=()=>{}
```

##### 构造函数

```
const getSum = new Function('a', 'b' , 'return a + b')
```

| **特征** | 函数声明                 | 函数表达式     |
| -------- | ------------------------ | -------------- |
| 预提升   | 会进行预提升             | 不会进行预提升 |
| 访问范围 | 函数内部和函数父级作用域 | 函数内部       |
| 函数名   | 不能没有                 | 可以没有       |

```
 test() //正常访问
 function test(){}  //预提升
 
 cs()   //报错
 let cs=function test1(){}
 cs()    //正常使用
 test1()  //不能访问，所以报错
```

#### 作用域和作用域链

**作用域指的是您有权访问的变量集合**作用域分为全局作用域、块级作用域、函数作用域

##### 作用域链

当可执行代码内部访问变量时，会先查找本地作用域，如果找到目标变量即返回，否则会去父级作用域继续查找...一直找到全局作用域。我们把这种作用域的嵌套机制，称为 作用域链。

#### 闭包

 一个函数访问另一个函数内的变量， 一般都是函数嵌套函数形成闭包，

为什么闭包还能访问到变量，因为闭包的变量不存在栈内存，而是保存在堆内存里

##### 闭包的优点



##### 闭包的缺点

会导致函数的变量一直保存在内存中，过多的闭包可能会导致内存泄漏

##### 闭包的使用场景

- 函数作为参数被传递和返回值被返回

- 单例模式

  ```
  单例模式是一种常见的涉及模式，它保证了一个类只有一个实例。实现方法一般是先判断实例是否存在，如果存在就直接返回，否则就创建了再返回。单例模式的好处就是避免了重复实例化带来的内存开销
  // 单例模式
  function Singleton(){
    this.data = 'singleton';
  }
  
  Singleton.getInstance = (function () {
    var instance;
      
    return function(){
      if (instance) {
        return instance;
      } else {
        instance = new Singleton();
        return instance;
      }
    }
  })();
  
  var sa = Singleton.getInstance();
  var sb = Singleton.getInstance();
  console.log(sa === sb); // true
  console.log(sa.data); // 'singleton'
  ```

- 封装私有属性和方法

  ```
  // 模拟私有属性
  function getGeneratorFunc () {
    var _name = 'John';
    var _age = 22;
      
    return function () {
      return {
        getName: function () {return _name;},
        getAge: function() {return _age;}
      };
    };
  }
  
  var obj = getGeneratorFunc()();
  obj.getName(); // John
  obj.getAge(); // 22
  obj._age; // undefined
  ```

  

#### this指向

- 默认绑定: 非严格模式下 this 指向全局对象，严格模式下 this 会绑定为 undefined

- 隐式绑定: 满足 XXX.fn() 格式，fn 的 this 指向 XXX。如果存在链式调用， this 永远指向最后调用它的那个对象 隐式绑定丢失：起函数别名，通过别名运行；函数作为参数会造成隐式绑定丢失。

  ```
     
     function foo1() {
          console.log(this.a);
      }
      function foo3() {
          console.log(this.a);
      }
      var obj = {
          a: 2,
          b:{
            a:1,
            foo: foo1
          },
         foo:foo3
      };
  
      obj.b.foo(); // 1
      obj.foo() //2
  ```

  

- 显式绑定: 通过 call/apply/bind 修改 this 指向

- new绑定: 通过 new 来调用构造函数，会生成一个新对象，并且把这个新对象绑定为调用函数的 this（this指向这个新对象）。

- 箭头函数绑定: 箭头函数没有 this ，箭头函数的 this 始终指向函数定义时的 this，而非执行时

  ```
  var name = "windowsName";
  
      var a = {
          name : "Cherry",
  
          func1: function () {
              console.log(this.name)     
          },
  
          func2: function () {
              setTimeout( () => {
                  this.func1()
              },100);
          }
  
      };
  
      a.func2()     // Cherry
  ```

  

  按照下方也可以理解

1. 函数调用，当一个函数不是一个对象的属性时，直接作为函数来调用时，`this`指向全局对象。
2. 方法调用，如果一个函数作为一个对象的方法来调用时，`this`指向这个对象。
3. 构造函数调用，`this`指向这个用`new`新创建的对象。
4. 第四种是 `apply 、 call 和 bind `调用模式，这三个方法都可以显示的指定调用函数的 this 指向。`apply`接收参数的是数组，`call`接受参数列表，`` bind`方法通过传入一个对象，返回一个` this `绑定了传入对象的新函数。这个函数的 `this`指向除了使用`new `时会被改变，其他情况下都不会改变。

##### new关键字

1、创建一个新的空对象 

```
var obj={}
```

2、设置新对象的原型__proto__属性指向构造函数的pototype对象

```
obj.__proto__=Class.prototype
```

3、构造函数的this赋值给新对象（即this指向新对象）

```
var ret=Class.apply(obj,arguments)
```

4、判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象

```js
return ret instanceof Object ? ret : obj;
```

#### call、apply和bind的区别

##### 作用

- 改变函数内部的`this`
- 这三个函数都是`函数对象`的方法，也就是说只有函数才可以直接调用这些方法。

`apply`和`call`的区别是`call`方法接受的是若干个参数列表，而`apply`接收的是一个包含多个参数的数组。

```
fun.call(thisArg[, arg1[, arg2[, ...]]])
fun.apply(thisArg, [argsArray])
立即执行
```

而bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。

```
var bindFn = fun.bind(thisArg[, arg1[, arg2[, ...]]])
bindFn()
可以自己确定什么时候执行
```

##### 使用场景

call继承

```
function person(name){
    this.name = name
}
function man(name){
    this.age = '男';
    person.call(this,name);              // 继承 man
}
var me = new man('海洋饼干');

console.log(me.name,me.age);             // '海洋饼干' '男'
```

合并数组 apply()

```
var a = [1,2,3];
var b = [4,5,6];
[].push.apply(a,b);    // 借用数组的push方法 等价 a.push(4,5,6);
console.log(a);        // [1, 2, 3, 4, 5, 6]
```

取数组的最大值和最小值apply()

```
var num = [6,9,-3,-5];
console.log(Math.max.apply(Math,num)); // 9  等价  console.log(Math.max(6,9,-3,-5));
console.log(Math.min.apply(Math,num)); // -5 等价  console.log(Math.min(6,9,-3,-5));
```

可以将一个类似（伪）数组的对象（比如arguments对象）转为真正的数组apply()

```
var ArrayLike = { // 一个类似数组的对象
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
}
//接收的是对象，返回的是数组
Array.prototype.slice.apply({0: 1, length: 1}) // [1]
Array.prototype.slice.apply({0: 1}) // []
Array.prototype.slice.apply({0: 1, length: 2}) // [1, undefined]
Array.prototype.slice.apply({length: 1}) // [undefined]
//（切下）[].slice(1, n)，返回索引为1到索引为n-1的数组
```

bind绑定

```
var fun ;
var obj = {
    a : 1,
    foo : function(){            // 不使用 _this， 避免无谓的变量声明
        fun = function(){
            console.log(this.a);
        }.bind(this);            // 代码很简洁,很漂亮（b格）
    }
}
var obj1 = { a : 2}
obj.foo();
fun();             // 1
fun.call(obj1);    // 1  call ,apply等绑定 无法修改
                   // 这里和上面call的位置不同是因为this所处于不同的位置
```

##### 原型和原型链

原型是一个对象，里面是一些属性和方法，每个对象都有隐式原型__proto__属性,该属性指向它的构造函数的显示原型prototype属性

```
  let  cat={
        name:'喵喵'
    }
    cat.__proto__.eat=function(){
        console.log('吃鱼')
    }
    cat.eat() //吃鱼
    function Dog(name,age){
        this.name=name;
        this.age=age
    }
    let dog=new Dog('小黄',2)
    Dog.prototype.eat=function(){
        console.log('吃骨头')
    }
    dog.eat() //吃骨头
```

#####  原型链

 如果你去某个对象查找一个不存在的属性和方法，那么它就会去隐式原型__proto__（或者构造函数的显示原型prototype）去寻找上方的  ，寻找的过程就是原型链

```
    //原型继承
    function User(username,password){
        this.username=username;
        this.password=password;
       this.login=function(){
            console.log('登录')
        }
    }
    function Admin(){
        this.deletePerson=function(){
            console.log('删除用户')
        }
    }
    Admin.prototype=new User();
    let admin=new Admin();
    admin.login() //登录
    
    admin并没有login方法，他便向__proto上去寻找，admin.__proto__等于Admin.prototype,Admin的原型等于User,在User中找到了login方法，向上寻找的过程形成了原型链
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c631b657ca62427a8bdef1a2c145346a~tplv-k3u1fbpfcp-watermark.awebp)

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/adede89e51c04a2b90beef8cb1cb848d~tplv-k3u1fbpfcp-watermark.awebp)

![img](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1ead8002adf6487ba7c080c81029e1e3~tplv-k3u1fbpfcp-watermark.awebp)

原型链的顶层是Object，Object.prototype的隐式原型指向null,为了避免死循环而设置

#### js运行机制详解（Event Loop）

js引擎存在monitoring process进程，会持续不断的检查主线程执行栈是否为空，一旦为空，就会去Event Queue那里检查是否有等待被调用的函数。这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）

所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）；

##### 同步任务

在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；

##### 异步任务

不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

##### 宏任务 or 微任务

这里需要注意的是new Promise是会进入到主线程中立刻执行，而promise.then则属于微任务

- 宏任务(macro-task)：整体代码script、setTimeOut、setInterval
- 微任务(mincro-task)：promise.then、promise.nextTick(node)

![img](https://upload-images.jianshu.io/upload_images/4820992-82913323252fde95.png?imageMogr2/auto-orient/strip|imageView2/2/w/863/format/webp)

##### 事件冒泡

事件冒泡可以形象地比喻为把一颗石头投入水中，泡泡会一直从水底冒出水面。也就是说，事件会从最内层的元素开始发生，一直向上传播，直到document对象。

以下是事件冒泡的执行顺序

**p -> div -> body -> html -> document**

##### 阻止冒泡

- event.stopPropagation(); // 一般浏览器停止冒泡
- event.cancelBubble; // IE 6 7 8 的停止冒泡

##### 事件捕捉

与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。

以下是事件捕捉的执行顺序

**document -> html -> body -> div -> p**

##### 事件委托

事件委托是利用的事件冒泡的原理，把事件绑定到需要处理元素的父亲元素上，如果要给下方的li绑定事件，每个都需要绑定，如果绑定给ul父元素，只用绑定一次，只操作了一次 DOM ，提高了程序的性能。

```
<ul>
    <li>111</li>
    <li>222</li>
    <li>333</li>
    <li>444</li>
</ul>
```

#### 原生ajax

**ajax**是一种异步通信的方法,从服务端获取数据,达到局部刷新页面的效果。 过程：

1. 创建`XMLHttpRequest`对象;
2. 调用`open`方法传入三个参数 请求方式`(GET/POST)、url、同步异步(true/false)`;
3. 监听`onreadystatechange`事件，当`readystate`等于4时返回`responseText`;
4. 调用send方法传递参数。

```
 function ajaxHttpRequestFunc(){
		let xmlHttpRequest;  // 创建XMLHttpRequest对象，即一个用于保存异步调用对象的变量
		if(window.ActiveXObject){ // IE浏览器的创建方式
            xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }else if(window.XMLHttpRequest){ // Netscape浏览器中的创建方式
            xmlHttpRequest = new XMLHttpRequest();
        }
		xmlHttpRequest.onreadystatechange=function(){ // 设置响应http请求状态变化的事件
            console.log('请求过程', xmlHttpRequest.readyState);
			if(xmlHttpRequest.readyState == 4){ // 判断异步调用是否成功,若成功开始局部更新数据
				console.log('状态码为', xmlHttpRequest.status);
				if(xmlHttpRequest.status == 200) {
					console.log('异步调用返回的数据为：', xmlHttpRequest .responseText);
					document.getElementById("myDiv").innerHTML = xmlHttpRequest .responseText; // 局部刷新数据到页面
				} else { // 如果异步调用未成功,弹出警告框,并显示错误状态码
					alert("error:HTTP状态码为:"+xmlHttpRequest.status);
				}
			}
		}
		xmlHttpRequest.open("GET","https://www.runoob.com/try/ajax/ajax_info.txt",true); // 创建http请求，并指定请求得方法（get）、url（https://www.runoob.com/try/ajax/ajax_info.txt）以及验证信息
		xmlHttpRequest.send(null); // 发送请求
    }

```

##### JS中Map和ForEach的区别:

forEach()方法不会返回执行结果，而是undefined。也就是说，forEach()会修改原来的数组
而map()方法会得到一个新的数组并返回。

##### 改变数组的方法

- splice()
- sort()
- pop()
- shift()
- unshift()
- push()
- reverse()

##### 不改变数组的方法

- slice()
- join()
- toString()
- cancat()
- indexOf()
- lastIndexOf()

##### 遍历数组的方法

- forEach()
- every() 检测数组所有元素是否都符合判断条件,返回true false
- some()  数组中的是否有满足判断条件的元素,返回true false
- map() 对数组中的每个元素进行处理，返回新的数组
- filter() 过滤原始数组，返回新数组
- reduce()  为数组提供累加器，合并为一个值

#### 浏览器从输入url到渲染页面，发生了什么？

##### 通过DNS解析域名的实际IP地址

##### 检查浏览器是否有缓存

##### 与服务器建立 TCP 连接。

##### 发送HTTP请求

##### 服务器处理请求并返回

##### 浏览器解析渲染页面

- 解析HTML形成DOM树
- 解析CSS形成CSSOM 树
- 合并DOM树和CSSOM树形成渲染树
- 浏览器开始渲染并绘制页面