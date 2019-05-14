# VUE

VUE 学习

当我们导入包之后，在浏览器内存中，就多了一个Vue构造函数

### 语法

1. 实例
    
    var vm = new Vue({}) // 创建实例vm

2. 挂载点

    **挂载点不能是 body**

    ```
    <div id="app"></div> // 挂载点
    var vm = new Vue({ // 实例只能处理挂载点下的内容
      el: "#app", // 绑定挂载点，选择器
    })
    ```

3. 设置数据

    ```
    // 一般写法 
    data: {
      content: "Hello World"
    }
    // 函数写法(以维护一份被返回对象的独立的拷贝)
    data: function () {
      return {
        content: 'Hello World'
      }
    }
    // ES6的函数写法
    data () {
      return {
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
    
    | 类型 | 闪烁问题  | 替换问题 | 转义问题 |
    | :--- | :--- | :--- | :--- |
    | {{}} | 有 | 只替换插值表达式 | 不转义 |
    | v-text | 无 | 替换内部所有内容 | 不转义 |
    | v-html | 无 | 替换内部所有内容 | 转义 |

5. 计算属性

    模板内的插值表达式非常便利，可以用于简单运算，但是放入太多逻辑会让模板过重且难以维护，例如：```{{ message.split('').reverse().join('') }}```

    所以对于复杂逻辑，要另辟蹊径：计算属性、侦听器、方法

    在computed属性中可以定义一些属性，这些属性叫做计算属性。它们的本质是一个方法，只不过在使用的时候，直接把它们的名称当作属性来使用，而不是把它们当作方法去调用，使用的时候一定不要加()

    使用方法

    默认GETTER

    ```
    fullName() {
      return this.firstName + " " + this.lastName;
    }
    ```

    GETTER 和 SETTER

    ```
    fullName: {
      get() {
        return this.firstName + " " + this.lastName;
      },
      set(newValue) {
        var names = newValue.split(' ');
        this.firstName = names[0];
        this.lastName = names[1];
      }
    }
    ```

    示例

    ```
    // vm挂载点下
    <div id="app">
        <input type="text" v-model="firstname"> +
        <input type="text" v-model="lastname"> =
        <input type="text" v-model="fullname">
    </div>
    ```

    ```
    var vm = new Vue({
        el: "#app",
        data() {
            return {
                firstname: '',
                lastname: ''
            }
        },
        // vm的computed属性里面定义fullname计算属性
        computed: {
            fullname(){
                return this.firstname + '-' + this.lastname;
            }
        }
    })
    ```
    
    在插值表达式中调用方法也可以达到同样的效果，例如

    ```
    {{fullName()}}
    ```

    ```
    methods: {
      fullName() {
        return this.firstname + '-' + this.lastname;
      }
    }
    ```

    但是不同的是计算属性是基于它们的响应式依赖进行缓存的，只在相关响应式依赖发生改变时它们才会重新求值，说简单点，就是：计算属性内部所用到的任何data中的数据发生变化时，才会立即重新计算该值。计算属性的求值结果会被缓存起来，方便下次直接使用，若无发生变化，则不会重新对其求值

    使用计算属性可以减少不必要的开销

6. 绑定属性

    v-bind:属性名，可以简写为:属性名
    
    v-bind中可以写合法的JS表达式，进行简单的操作

    ```
    <div :title="content">{{content}}</div>

    <div :title="content + '123'">{{content}}</div>

    <div :title="content == 'Hello World'? content : ''">{{content}}</div>
    ```

7. 事件

    补充:获取vm的data里数据或调用methods的方法:this.数据属性名或this.方法名来访问(this指向new出来的实例vm)

    v-on:事件，可以简写为@:事件

    - 可以用v-on指令监听DOM事件，并在触发时运行一些JS代码

      ```
      // vm挂载点下
      <button v-on:click="counter += 1">Add 1</button>
      <p>{{counter}}</p>
      ```

      ```
      // vm的data属性里面定义content
      data: {
        counter: 0
      }
      ```

    - 事件处理方法

      默认传递event对象

      ```
      // vm挂载点下
      <button id="button" @click="show">button</button>
      ```

      ```
      // vm的methods属性里面定义show
      show: function (event) {
        // this指向当前vue实例
        console.log(this.content);
        // event是原生DOM事件
        if (event) {
          console.log(event.target.id);
        }
      }
      ```

      ```
      // 外部也可以直接调用方法
      vm.show();
      ```

    - 事件参数

      当有其他参数时，需要event对象可以使用$event获取

      ```
      // vm挂载点下
      <div id="parent" @click="show('Hello Parent',$event)">
        <div id="child" @click="show('Hello Child',$event)"></div>
      </div>
      ```

      ```
      // vm的methods属性里面定义show
      show: function (message, event) {
        if (event) {
            event.stopPropagation();
        }
        console.log(message);
      }
      ```

8. 事件修饰符

    - .stop 阻止冒泡

    - .prevent 阻止默认事件

    - .capture 捕获时触发

    - .self 只有点击当前元素才会触发

    - .once 只触发一次

    - .passive 告诉浏览器不阻止事件的默认行为

9. 双向绑定

    v-model:属性，只能运用在表单元素中

    v-model会忽略所有表单元素的value、checked、selected特性的初始值而总是将vm示例的数据作为数据来源

    v-model在内部为不同的输入元素使用不同的属性并抛出不同的事件

    - text和textarea元素使用value属性和input事件

    - checkbox和radio元素使用checked属性和change事件

    - select将value作为prop并将change作为事件

10. 绑定class

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

11. 绑定style

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

12. v-for指令

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
    - key 绑定的属性只能是 number 或 string 类型
    - key 需要使用 v-bind 绑定，即 v-bind:key

13. v-if / v-show

    - v-if 每次都会重新删除或创建元素，切换耗性能
    - v-show 只是切换元素的 display 样式，初始耗性能

14. 过滤器

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

15. 自定义指令

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