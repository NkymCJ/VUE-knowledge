# VUE

VUE 学习

### 语法

1. 实例
    
    var vm = new Vue({}) //创建实例vm

2. 挂载点

  **挂载点不能是 body**

    ```
    <div id="dot"></div> //挂载点
    var vm = new Vue({ //实例只能处理挂载点下的内容
        el: "#dot", //绑定挂载点，选择器
    })
    ```

3. 设置数据

    ```
    // 一般写法 
    data : {
      content: "Hello World"
    }

    // 函数写法(以维护一份被返回对象的独立的拷贝)
    data : function(){
      return{
        content: 'Hello World'
      }
    }

    // ES6写法
    data(){
      return{
        content: 'Hello World'
      }
    }
    ``` 

4. 获取数据

    ```
    <div>{{content}}</div>
    <div v-text="content"></div>
    <div v-html="content"></div>
    ```

    | 类型 | 共同点 | 闪烁问题  | 转义问题 |
    | - | - | - | - | - |
    | {{}} | 显示数据 | 有 | 不转义 |
    | v-text | 显示数据 | 无 | 不转义 |
    | v-html | 显示数据 | 无 | 转义 |

    **使用v-cloak(1.添加属性：v-cloak；2.添加样式：[v-cloak]{display:none;})解决闪烁问题，有必要时使用 !important**

5. 绑定属性

    v-bind:属性名，简写为 :属性名

    ```
    <div :title="content == 'Hello World'? content: ''">{{content}}</div>
    ```

    **v-bind的绑定的值为 JS表达式，可以进行简单的操作**

6. 绑定事件

    v-on:事件，简写为 @:事件

    ```
    // 挂载点下
    <button id="button" @click="show">button</button>

    // 实例的 methods 属性里
    show:function(event) {
      // this 指向当前 vue 实例
      console.log(this.content);

      // event 是原生 DOM 事件
      if(event){
        console.log(event.target.id);
      }
    }
    ```

    **获取实例 data 的数据或调用 methods 的方法：this.数据属性名 或 this.方法名来访问(this指向new出来的实例)**

7. 事件修饰符

    - .stop 阻止冒泡
    - .prevent 阻止默认事件
    - .capture 实现捕获事件
    - .self 只有点击当前元素才会触发
    - .once 只触发一次
    - .passive 告诉浏览器不阻止事件的默认行为

8. 双向绑定

    v-model:属性

    **只能运用在表单元素中**

9. 绑定class

    v-bind:属性名，简写为 :属性名

    **v-bind:class 可以与普通的class属性共存**

    ```
    <div class="static" v-bind:class="dynamic"></div>
    ```
        
    - 语法

      ```
      // 使用数组的语法

      // 普通模式0
      // DOM
      <div v-bind:class="['class0','class1']">X</div>
      // 样式表
      .class0{}
      .class1{}

      // 普通模式1
      // DOM
      <div v-bind:class="[class0,class1]">X</div>
      // 样式表
      .class0{}
      .class1{}
      // 实例中的data
      data:{
        class0:'class0',
        class1:'class1'
      }

      // 使用三元表达式
      // DOM
      <div v-bind:class="[class0,isActive?class1:'']">X</div>
      // 样式表
      .class0{}
      .class1{}
      // 实例中的data
      data:{
        class0:'class0',
        class1:'class1',
        isActive:true
      }

      // 数组中使用对象语法
      // DOM
      <div v-bind:class="[class0,{class1:isActive}]">X</div>
      // 样式表
      .class0{}
      .class1{}
      // 实例中的data
      data:{
        class0:'class0',
        class1:'class1',
        isActive:true
      }

      // 使用对象的语法
      // 此时对象的属性为类名，可带引号也可不带引号
      // 此时对象的值为标识符

      // DOM
      <div v-bind:class="{class0:isClass0Active,class1:isClass1Active}">X</div>
      // 样式表
      .class0{}
      .class1{}
      // 实例中的data
      data:{
        isClass0Active:true,
        isClass1Active:false
      }

      // DOM
      <div v-bind:class="class2">X</div>
      // 样式表
      .class0{}
      .class1{}
      // 实例中的data
      data:{
        class2:{class0:true,class1:true}
      }
      ```

10. 绑定style

    v-bind:属性名，简写为 :属性名

    - 语法

      ```
      // 使用对象的语法
      // 此时对象的属性名为CSS属性名，使用 驼峰式 或 用单引号括起来的短横线分割 来命名

      // DOM
      <div v-bind:style="{color:'red','font-weight':550}">x</div>
      //<div v-bind:style="{color:'red',fontWeight:550}">x</div>

      // DOM
      <div v-bind:style="styleList">x</div>
      // 实例中的data
      data:{
        styleList:{color:'red','font-weight':550}
        // styleList:{color:'red',fontWeight:550}
      }

      // 使用数组的语法
      // 将多个样式对象应用到同一个元素上

      // DOM
      <div v-bind:style="[styleList0,styleList1]">x</div>
      // 实例中的data
      data:{
        styleList0:{color:'red',fontWeight:550},
        styleList1:{backgroundColor:'deepskyblue',height:'150px'}
      }
      ```

11. v-for指令

    - 遍历数组 v-for="(item,index) in items"

      ```
      // DOM
      <p v-for="(item,index) in List0">{{index}}-{{item}}></p>
      // 实例中的data
      data:{
        List0:['00','11','22','33','44','55','66']
      }
      ```

    - 迭代对象属性 v-for="(value,key,index) in obj"

      ```
      // DOM
      <p v-for="(value,key,index) in obj">{{index}}-{{key}}-{{value}}></p>
      // 实例中的data
      data:{
        obj:{
            name:'Rex',
            age:23
        }
      }
      ```

    - 取值范围重复 v-for="count in 10"

      ```
      // DOM
      <p v-for="count in 10">{{count}}</p>
      ```

    **PS: 注意事项**

    每次循环时，使用 key 标识当前项的唯一身份
    - key 绑定的属性智能是 number 或 string 类型
    - key 需要使用 v-bind 绑定，即 v-bind:key

12. v-if / v-show

    - v-if 每次都会重新删除或创建元素，切换耗性能
    - v-show 只是切换元素的 display 样式，初始耗性能

13. 过滤器

    过滤器用在两个地方：插值表达式 和 v-bind 表达式
    
    **过滤器接收表达式的值作为第一个参数，还可接收其他参数**

    **过滤器可以串联，将前一个过滤器处理的结果传给下一个过滤器**

    **过滤器采用就近原则，如果私有过滤器与全局过滤器名称一致，优先调用私有过滤器**

    - 定义全局过滤器
    
      **使用全局过滤器时，全局过滤器需在创建实例之前定义**
    
      ```
      // DOM
      {{ content | myFilter }}

      // 注册
      Vue.filter('myFilter', function (data) {
          return data + '123';
      });
      ```

    - 接收更多参数

      ```
      // DOM
      {{ content | myFilter('123') }}
      
      // 注册
      Vue.filter('myFilter', function (data,arg0) {
          return data + arg0;
      });
      ```

    - 串联过滤器

      ```
      // DOM
      {{ content | myFilter('123') | myFilter1 }}

      // 注册
      Vue.filter('myFilter', function (data, arg0) {
        return data + arg0;
      });
      Vue.filter('myFilter1', function (data) {
        return data + '!';
      });
      ```

    - 定义私有过滤器

      ```
      filters: {
        myFilter:function(data){
            return data + '!';
        }
      }
      ```

14. 自定义指令

    **定义时不需要加 v- 前缀，调用时需要加上 v- 前缀**

    - 定义全局自定义指令

      ```
      Vue.directive('指令名称', {
        // 钩子函数
      });
      ```
    
    - 定义私有自定义指令

      ```
      directives: {
        指令名称: {
          // 钩子函数
        }
      }
      ```
    
    - 钩子函数

      - bind:function(el){} **常用**
        
        指令绑定到元素时调用，只调用一次，可以在这里进行一次性的初始化设置，此时元素还没插入到DOM中

        因此，**和样式设置相关的一般放在这里**，例如 el.style.color='red'

      - inserted:function(el){} **常用**

        元素插入到DOM中时调用，只调用一次

        因此，**和JS操作相关的一般放在这里**，例如 el.focus()

      - update:function(el){} **常用**

        当VNode更新时调用，可能会调用多次

      - componentUpdated:function(el){}

        指令所在组件的VNode及其子VNode全部更新后调用

      - unbind:function(){el}

        指令与元素解绑时调用，只调用一次

    - 钩子函数的参数

      - el 指令所绑定的元素，原生JS对象，可以用来直接操作DOM

      - binding

        - name 指令名，不包括 v- 前缀 **常用**

        - value 指令绑定的值 **常用**

          例如 v-my="1+1" 中，绑定值为 2

        - oldValue 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用

        - expression 字符串形式的指令表达式 **常用**

          例如 v-my="1+1" 中，表达式为 1+1

        - arg 传给指令的参数

          例如 v-my:foo 中，参数为 foo

        - modifiers 一个包含修饰符的对象

          例如 v-my.foo.bar 中，修饰符对象为{ foo : true, bar : true }

      - vnode Vue编译生成的虚拟节点

      - oldVnode 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用

    - 函数简写

      若想在 bind 和 update 时触发相同行为，而不关心其它的钩子，可以使用如下写法：

      ```
      // 全局自定义指令
      Vue.directive('color', {
        bind: function (el,binding) {
          el.style.color = binding.value;
        }
      });
      // 简写成
      // 这个 function 等同于把代码写到了 bind 和 update 中
      Vue.directive('color', function (el,binding) {
          el.style.color = binding.value;
      });

      // 私有自定义指令
      directives:{
        'color' : {
          bind : function (el,binding){
            el.style.color = binding.value;
          }
        }
      }
      // 简写成
      // 这个 function 等同于把代码写到了 bind 和 update 中
      directives:{
        'color' : function (el,binding){
          el.style.color = binding.value;
        }
      }
      ```

    - 对象字面量

      如果指令需要多个值，可以传入一个 JavaScript 对象字面量。指令函数能够接受所有合法的 JavaScript 表达式。

      ```
      // DOM
      v-demo="{ text0: 'Hello', text1: 'World' }"

      // 注册
      Vue.directive('demo', function (el, binding) {
        console.log(binding.value.text0) // "Hello"
        console.log(binding.value.text1) // "World"
      });
      ```