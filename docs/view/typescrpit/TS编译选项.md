---
title: TS-tsconfig.json
date: 2022-8-03
sidebar: 'auto'
categories:
 - tsconfig.json
tags:
 - ts
---
## tsconfig.json

tsconfig.json 是ts编译器的配置文件 ts编译器可以根据它的信息来对代码进行编译

``` typescript
{
    /**
    tsconfig.json 是ts编译器的配置文件 ts编译器可以根据它的信息来对代码进行编译
    include 用来指定那些ts文件需要被编译
    路径:** 表示任意目录
          * 表示任意文件
    exclude 不需要被编译的文件目录
    默认值:[node_modules]
    */
    "include": [
        "./src/**/*"
    ],
    // "exclude": [
    //     "./src/hello/**/*"
    // ],
    /*
    compilerOptions 编译器的选项
    */
    "compilerOptions": {
       //target  用来指定ts被编译为ES的版本
       //es3 es5 es6 es2015 es2016 es2017 es2018 es2019 es2020
      "target": "ES3",
      // module 指定要使用的模块化的规范
      "module": "system",
      // lib 用来指定项目的要使用的库 一般情况下不需要写
      // "lib": []
      // outDir 用来指定编译后文件所在的目录
      "outDir": "./dist",
      //将代码合并为同一个文件
      //设置 outFile后，所有的全局作用域中的代码会合并到同一个文件中
      // "outFile": "./dist/app.js"
      //是否对js文件进行编译，默认是false
       "allowJs": true,
       //是否检查js文件代码是否符合语法规范，默认是false
       "checkJs": false,
       //是否移除注释 默认是false
       "removeComments": true,
       //不生成编译后的文件 默认是false
       "noEmit": false,
       //当有错误时不生成编译后的文件 默认是false
       "noEmitOnError": false,
       //所有严格检查的总开关
       "strict":false,
       //用来设置编译后的文件是否使用严格模式 默认是false
       "alwaysStrict": false,
       //不允许隐式的any类型
       "noImplicitAny": false,
       //严格检查空值
       "strictNullChecks": false
       
    }
}
```

