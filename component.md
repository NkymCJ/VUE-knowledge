# VUE

VUE 学习

### component

1. 创建全局组件的第一种方式

    - 使用 **Vue.extend** 创建 Vue 扩展实例构造器

        *template 属性指向的模板内容必须有且只有一个根元素*

    - 使用 **Vue.component('组件名称',Vue 扩展实例构造器)** 注册组件

        *组件名称最好命名方式：小写&&短横线分隔*

        *如果组件注册时使用的是驼峰式，使用的时候也要改为 小写&&短横线分隔*

    - 示例

        ```
        <!-- HTML -->
        <div id="app" v-cloak>
            <my-com1></my-com1>
        </div>

        <!-- SCRIPT -->
        var com1 = Vue.extend({
            template: '<h3>使用 Vue.extend 创建的组件</h3>'
        });
        Vue.component('my-com1', com1);
        var vm = new Vue({
            el: '#app',
            data: function () {
                return {
                }
            }
        });
        ```

2. 创建全局组件的第二种方式

    - 使用 **template** 元素，在外部定义组件结构，id 定为 **templ**

    - 使用 **Vue.component('组件名称',{template:'#templ'})** 注册组件

    - 示例

        ```
        <!-- HTML -->
        <div id="app" v-cloak>
            <my-com2></my-com2>
        </div>
        <template id="templ">
            <div>
                <h1>通过 template 元素，在外部定义的组件结构</h1>
            </div>
        </template>

        <!-- SCRIPT -->
        Vue.component('my-com2', {
            template:'#templ'
        });
        var vm = new Vue({
            el: '#app',
            data: function () {
                return {
                }
            }
        });
        ```

3. 创建私有组件的方式

    - 与创建全局组件类似

    - 示例

        ```
        <!-- HTML -->
        <div id="app" v-cloak>
            <login></login>
        </div>
        <template id="templ">
            <div>
                <h1>通过 template 元素，在外部定义的组件结构</h1>
            </div>
        </template>

        <!-- SCRIPT -->
        var vm = new Vue({
            el: '#app',
            data: function () {
                return {
                }
            },
            components: {
                'login':{
                    // template:'<h1>私有的 login 组件</h1>'
                    template:'#templ' // 使用在外部定义的组件结构
                }
            }
        });
        ```

4. 组件中的 data 属性

    - 必须是一个方法

    - 方法内部必须返回一个对象

    - 使用方式与实例中的一样

5. 组件切换
    
    - 使用 **v-if v-else语句** 实现两组件切换

        ```
        <!-- HTML -->
        <div id="app" v-cloak>
            <a href="" @click.prevent="flag=true">登录</a>
            <a href="" @click.prevent="flag=false">注册</a>
            <login v-if="flag"></login>
            <register v-else="flag"></register>
        </div>

        <!-- SCRIPT -->
        Vue.component('login', {
            template: '<h3>登录组件</h3>'
        });
        Vue.component('register', {
            template: '<h3>注册组件</h3>'
        });
        var vm = new Vue({
            el: '#app',
            data: function () {
                return {
                    flag: true
                }
            }
        });
        ```

    - 使用 **component元素** 实现多组件切换

        *component是一个占位符，:is 属性可以用来指定要展示的组件的名称*
        ```
        <!-- HTML -->
        <div id="app" v-cloak>
            <a href="" @click.prevent="comName='login'">登录</a>
            <a href="" @click.prevent="comName='register'">注册</a>
            <component :is="comName"></component>
        </div>

        <!-- SCRIPT -->
        Vue.component('login', {
            template: '<h3>登录组件</h3>'
        });
        Vue.component('register', {
            template: '<h3>注册组件</h3>'
        });
        var vm = new Vue({
            el: '#app',
            data: function () {
                return {
                    comName:'login'
                }
            }
        });
        ```

    - 组件切换动画

        ```
        <!-- CSS -->
        .v-enter,
        .v-leave-to {
            opacity: 0;
            transform: translateX(180px);
        }
        .v-enter-active,
        .v-leave-active {
            transition: all 0.5s ease;
        }

        <!-- HTML -->
        <div id="app" v-cloak>
            <a href="" @click.prevent="comName='login'">登录</a>
            <a href="" @click.prevent="comName='register'">注册</a>
            <transition mode="out-in">
                <component :is="comName"></component>
            </transition>
        </div>

        <!-- SCRIPT -->
        Vue.component('login', {
            template: '<h3>登录组件</h3>'
        });
        Vue.component('register', {
            template: '<h3>注册组件</h3>'
        });
        var vm = new Vue({
            el: '#app',
            data: function () {
                return {
                    comName:'login'
                }
            }
        });
        ```

6. 组件间传值

    - 父组件向子组件传值

        + 在引用子组件的时候，通过 **属性绑定(v-bind:)** 形式，把需要传递给子组件的数据，以属性绑定的形式，传递到子组件内部，供子组件使用

        + 需要在子组件的 **props** 属性中定义一下，才能使用

            *props 中的数据都是通过父组件传递给子组件的，只读，无法重新赋值*
        
        + 示例

            ```
            <!-- HTML -->
            <div id="app">
                <com1 v-bind:parentmsg="msg"></com1>
            </div>

            <!-- SCRIPT -->
            var vm = new Vue({
                el: '#app',
                data: function () {
                    return {
                        msg: '父组件中的数据'
                    }
                },
                components: {
                    com1: {
                        props: ['parentmsg'],
                        template: '<h1>这是子组件{{parentmsg}}</h1>'
                    },
                    methods: {
                    }
                }
            });
            ```

    - 父组件传递方法给子组件

        + 在引用子组件的时候，通过 **事件监听(v-on:)** 形式，把需要传递给子组件的方法，以事件监听的形式，传递到子组件内部，供子组件使用

        + 子组件中的方法通过 **this.$emit('事件监听绑定的方法名')** 去执行绑定在此名上的父组件的方法

            *this.$emit的第一个参数为事件监听方法名，其余参数为父组件方法的参数*
        
        + 示例

            ```
            <!-- HTML -->
            <div id="app">
                <!-- 把父组件的 show 方法放在子组件的func上，供emit使用 -->
                <com1 @func="show"></com1>
            </div>
            <template id="tmp1">
                <div>
                    <h1>这是子组件</h1>
                    <input type="button" value="子组件的按钮，点击触发父组件传递的func方法" @click="myClick">
                </div>
            </template>

            <!-- SCRIPT -->
            var com1 = {
                template: '#tmp1',
                data () {
                    return {
                        info:{
                            name:'cj',
                            age:23
                        }      
                    }
                },
                methods: {
                    myClick() {
                        // 第一个参数为函数名，其余参数为函数参数
                        this.$emit('func',this.info);
                    }
                }
            }
            var vm = new Vue({
                el: '#app',
                data: function () {
                    return {
                        info:null
                    }
                },
                components: {
                    //com1:com1
                    com1
                },
                methods: {
                    show(data) {
                        // console.log('调用了父组件身上的show方法');
                        this.info = data;
                    }
                }
            });
            ```