# VUE

VUE 学习

### router

[路由使用文档](https://router.vuejs.org/zh/ "路由使用文档")

[路由API文档](https://router.vuejs.org/zh/api/ "路由API文档")

---

起步

1. 安装 vue-router 路由模块

    直接引入脚本文件：`<script src="/vue-router.js"></script>`

2. 创建一个路由对象

    当引入 vue-router 包之后，在 window 全局对象中，就有了一个路由的构造函数，叫做 **VueRouter** 。在 new 路由对象的时候，可以为构造函数传递一个 **配置对象**

    `var routerObj = new VueRouter({routes:routes}); // 可简写为{routes}`

3. routes 路由匹配规则

    - 每条路由规则都是一个对象

    - **path**。表示要监听 哪个路由链接地址

    - **component**。 表示 Vue.extend() 创建的组件构造器 或 一个组件配置对象

    - **redirect**。 表示重定向，即当访问 /a 时， URL会替换成 /b

    - **alias**。表示别名，即当访问 /a 时，URL会保持为 /a，但匹配到的内容为 /b
    
    示例

    ```
    routes: [
        {path: '/',redirect: '/login'}, 
        {path: '/login', component: login},
        {path: '/register',component: register}
    ]
    ```

4. 通过 router 配置参数注入路由

    将 routes 路由规则 注册到 Vue 实例上，监听 URL 地址的变化，展示对应组件

    ```
    var vm = new Vue({
        el: '#app',
        router: routerObj
    });
    ```

5. router-view

    路由出口。vue-router 提供的元素，占位符。路由匹配到的组件在此处渲染

    `<router-view></router-view>`

6. router-link

    导航。通过 to 属性来指定链接，默认会被渲染成一个 a标签，可通过 tag 属性更改

    ```
    <router-link to="/login">登录</router-link>
    <router-link to="/register" tag="span">注册</router-link>
    ```

7. 切换动画

    使用 transition 元素包裹 router-view，增加对应样式即可

8. 完整例子详见 **demo/router/路由起步**