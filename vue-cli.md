1. ```npm i webpack webpack-cli -g```

2. ```npm i vue-cli -g```

3. ```vue init webpack myshop```
项目名称。小写。
项目描述。
项目作者。
编译运行时。第一项。
是否安装路由。是。
是否使用ESLint检查语法格式。否。
是否进行单元测试。否。
是否使用e2e测试。否。
安装包的方式。第一项。

4. ```cd project```

5. ```npm run dev```。改了配置的话就要Ctrl+C关闭，再npm run dev重新启动一次。

6. "@/xxx"的@指的是src下。

7. 输入<，默认scaffold为创建.vue文件的三层结构。

8. style的scoped表示局部，只在该vue文件起作用。

9. src的main.js为主入口。

补充：

1. npm install

`npm install moduleName` 安装模块到项目目录下。和`npm install moduleName --save`效果相同。 
`npm install moduleName -g` 将模块安装到全局，具体安装到哪个位置，看npm config prefix的位置。
`npm install moduleName --save` 将模块安装到项目目录下，并在package文件的dependencies节点写入依赖。可简写为`npm install moduleName -S`。
`npm install moduleName --save-dev` 将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖。可简写为`npm install moduleName -D`。

`npm install`可简写为`npm i`。

dependencies是运行时的依赖，devDependencies是开发时的依赖。