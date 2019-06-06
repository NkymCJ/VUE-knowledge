# VUE

VUE 学习

当我们导入VUE脚本之后，在浏览器内存中，就多了一个Vue构造函数。

## 实例

创建vm实例：```var vm = new Vue({});```

## 挂载点

挂载点不能是body，vm实例只能处理挂载点下的内容。

绑定挂载点的值为CSS选择器。

示例：

```
<div id="app"></div>

```

```
var vm = new Vue({
  el: "#app"
})
```

## 设置数据

### 一般写法

```
data: {
  content: "Hello Vue"
}
```

### 函数写法(以维护一份被返回对象的独立的拷贝)

```
data: function () {
  return {
    content: "Hello Vue"
  }
}
```

### ES6简写

```
data() {
  return {
    content: "Hello Vue"
  }
}
``` 

## 获取数据

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

解决插值表达式的闪烁问题：添加v-cloak样式。一般放在挂载点，注意样式优先级。

VUE会在插值表达式替换完成时清除此样式。

v-cloak样式定义如下：（!important 视情况而定）

```
[v-cloak] {
  display:none !important;
}
```

## 计算属性

模板内的插值表达式非常便利，可以用于简单运算，但是放入太多逻辑会让模板过重且难以维护，例如下面这个插值表达式：

```{{ message.split(" ").reverse().join(" ") }}```

所以对于复杂逻辑，要另辟蹊径。可以使用计算属性、侦听器、方法。

可以在computed属性中可以定义一些数据，这些数据叫做计算属性。它们的本质是一个方法，只不过在使用的时候，直接使用它们的名称，而不是把它们当作方法去调用，使用的时候一定不要加()。

#### 设置和使用

1. 默认GETTER

    这种形式只创建了GETTER，如果进行SET的话会报错。

    ```
    computed: {
        fullName() {
            return this.firstName + " " + this.lastName;
        }
    }
    ```

2. GETTER和SETTER同时创建

    ```
    fullName: {
      get() {
        return this.firstName + " " + this.lastName;
      },
      set(newValue) {
        var names = newValue.split(" ");
        this.firstName = names[0];
        this.lastName = names[1];
      }
    }
    ```

3. 使用方法

    ```
    {{fullName}} // 使用时切记不要加()
    ```

#### 计算属性与方法的差异

在插值表达式中调用方法也可以达到同样的效果，例如：

```
{{getfullName()}}
```

```
methods: {
  getfullName() {
    return this.firstName + " " + this.lastName;
  }
}
```

区别：

1. 计算属性是基于它所依赖的数据进行更新的，在相关依赖的数据发生变化时，才会进行更新。而普通的方法每次都会执行。

2. 计算属性是有缓存的，只要它所依赖的数据没有发生改变，后面的每一次访问计算属性中的值，都是之前缓存的结果，不会重复执行。

所以，在某些情况下，使用计算属性可以减少不必要的开销。

#### 计算属性与侦听器的差异

使用侦听器也可以达到同样的效果，例如：

```
{{firstName}} + {{lastName}} = {{fullName}}
```

```
data() {
  return {
    firstName: "",
    lastName: "",
    fullName: ""
  }
},
watch: {
  firstName(newVal, oldVal) {
    this.fullName = newVal + " " + this.lastName;
  },
  lastName(newVal, oldVal) {
    this.fullName = this.firstName + " " + newVal;
  }
}
```

计算属性与侦听器各有各的好处。

## 绑定属性

v-bind:属性名，可以简写为 :属性名。

v-bind绑定的值中可以写合法的JS表达式，进行简单的操作：

```
<span :title="title">demo</span>
<span :title="title + '123'">demo</span>
<span :title="title == '123'? 'YES' : 'NO'">demo</span>
```

## 事件

v-on:事件，可以简写为 @:事件。

#### 绑定事件

1. 可以用v-on指令监听DOM事件，并在触发时运行一些JS代码

    ```
    <button v-on:click="count += 1">Add 1</button>
    <p>{{count}}</p>
    ```

2. 事件处理方法

    不写参数，默认传递event事件对象。

    ```
    <button id="button" @click="show">button</button>
    ```

    ```
    show: function (event) {
      // this指向当前vue实例
      console.log(this.content);
      // event是原生DOM事件
      if (event) {
        console.log(event);
      }
    }
    ```
    
    外部也可以直接调用方法，但此时没有event事件对象，event为undefined。
    ```
    vm.show();
    ```

3. 事件参数

    当有其他参数时，需要event对象可以使用$event。

    ```
    <div id="parent" @click="show('Hello Parent',$event)">
      <div id="child" @click="show('Hello Child',$event)"></div>
    </div>
    ```

    ```
    show: function (message, event) {
      if (event) {
          event.stopPropagation();
      }
      console.log(message);
    }
    ```

## 事件修饰符

事件修饰符

```.stop``` 阻止冒泡

```.prevent``` 阻止默认事件；

```.capture``` 捕获时触发；

```.self``` 只有点击当前元素才会触发；

```.once``` 只触发一次；不像其它事件修饰符只能对原生的DOM事件起作用，.once修饰符可以被用到自定义的组件事件上。

```.passive``` 告诉浏览器不阻止事件的默认行为；

事件修饰符可以串联，例如```v-on:click.prevent.self```和```v-on:click.self.prevent```，详见06A.事件修饰符串联.html。

## 双向绑定

v-model:属性，只能运用在表单元素中。

使用v-model时应该在组件的data数据中声明其初始值。

v-model会忽略所有表单元素的value、checked、selected特性的初始值而总是将vm示例的数据作为数据来源。

v-model在内部为不同的输入元素使用不同的属性并抛出不同的事件：

1. text和textarea元素使用value属性和input事件；

2. checkbox和radio元素使用checked属性和change事件；

3. select将value作为prop并将change作为事件。

#### 双向绑定的修饰符

1. .lazy ```<input v-model.lazy="content" >```

    在默认情况下，v-model在每次input事件触发后将输入框的值与数据进行同步(除了输入法组合文字时)。可以通过添加lazy修饰符，从而转变为使用change事件进行同步。

    补充：change事件是更改内容后失焦触发的。input事件是每按一个键都会触发。

2. .number ```<input v-model.number="age">```

    添加number修饰符，自动将用户的输入值转为数值类型。

3. .trim ```<input v-model.trim="content">```

    添加trim修饰符，自动过滤用户输入的首尾空白字符。

## 绑定class

v-bind:属性名，简写为:属性名。

v-bind:class 可以与普通的class属性共存。

```
<div class="static" v-bind:class="dynamic"></div>
```

总结：对象形式的，对象的属性名是类名，不管加不加引号，对象的值才是数据；数组形式的，加引号是类名，不加则是数据。

#### 数组形式

1. 直接使用类名。使用class和class1样式。

    ```
    .class{}
    .class1{}
    <div v-bind:class="['class','class1']">X</div>
    ```

2. 使用数据。使用数据class和class1的值的样式。

    ```
    .class{}
    .class1{}
    <div v-bind:class="[class,class1]">X</div>
    data:{
      class:'class',
      class1:'class1'
    }
    ```

3. 使用三元表达式。使用数据class的值的样式，再根据数据isActive的值（真或假）来决定是否使用class1的值的样式。

    ```
    .class{}
    .class1{}
    <div v-bind:class="[class,isActive?class1:'']">X</div>
    data: {
      class: 'class',
      class1: 'class1',
      isActive: true
    }
    ```

4. 数组形式中再使用对象形式。使用数据class的值的样式，再根据数据isActive的值（真或假）来决定是否使用class1的样式。

    此时对象的class1键为类名，可带引号也可不带引号；值为数据。

    ```
    .class{}
    .class1{}
    <div v-bind:class="[class,{class1:isActive}]">X</div>
    data:{
      class:'class',
      isActive:true
    }
    ```

#### 对象形式

键为类名，可带引号也可不带引号；值为数据。

```
.class{}
.class1{}
<div v-bind:class="{class:classActive,class1:class1Active}">X</div>
data:{
  classActive:true,
  class1Active:false
}
```

以上代码中，是否使用class和class1样式，取决于classActive和class1Active的truthiness（真或假）。

```
.class{}
.class1{}
<div v-bind:class="class2">X</div>
data:{
  class2:{class:true,class1:true}
}
```

以上代码中，class和class1的样式均被使用。

## 绑定style

v-bind:属性名，简写为:属性名。

v-bind:style 可以与普通的style属性共存。

```
<div style="margin-left:10px;" v-bind:style="color:'red'"></div>
```
#### 数组形式

将多个样式对象应用到同一个元素上。

```
<div v-bind:style="[styleList,styleList1]">x</div>
data:{
  styleList:{color:'red',fontWeight:550},
  styleList1:{backgroundColor:'deepskyblue',height:'150px'}
}
```

#### 对象形式

此时对象的键名为CSS属性名，使用驼峰式（不加引号）、用单引号括起来的短横线分割来命名。

```
<div v-bind:style="{color:'red','font-weight':550}">x</div>
<div v-bind:style="{color:'red',fontWeight:550}">x</div>
<div v-bind:style="styleList">x</div>
<div v-bind:style="styleList1">x</div>
data:{
  styleList:{color:'red','font-weight':550}
  styleList1:{color:'red',fontWeight:550}
}
```

## 条件渲染 v-if与v-show

#### v-if

v-if指令用于条件性地渲染一块内容。

这块内容只会在指令的表达式返回truthy值的时候被渲染。

```
<h2 v-if="see"></h2>
<h2 v-if="value > 0"></h2>
<h2 v-if="getValue() > 0"></h2>
```

```
data() {
  return {
    see: true,
    value: 1
  }
},
methods: {
  getValue() {
    return 1;
  }
}
```

可以用v-else来表示v-if的“else块”。

可以用v-else-if来表示v-if的“else-if块”。

v-else和v-else-if都必须紧跟在v-if或v-else-if的元素后面，否则将不会被识别。

##### 用KEY管理可复用的元素

Vue会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这是因为Virtual DOM使用Diff算法实现的原因。

为什么需要这样做? 详见11A.条件渲染绑定KEY演示.html

#### v-show

v-show也可以条件地展示元素。用法与v-if大致一样。

#### 两者的不同点

- v-if每次切换过程中每次都会销毁和重建元素，切换耗性能
- v-show只是切换元素的display样式，初始耗性能

总结：如果需要非常频繁地切换，则使用v-show较好；如果
在运行时条件很少改变，则使用v-if较好。

## 列表渲染 v-for

#### 遍历数组 

```v-for="item in items"```

```v-for="(item,index) in items"```

items是数据数组，item是数组元素迭代的别名，index为当前项的索引。

也可以用of替代in作为分隔符。

```
<p v-for="(item,index) in items">{{index}}-{{item}}></p>
```

```
data:{
  items:['00','11','22','33','44','55','66']
}
```

#### 迭代对象

```v-for="value in obj"```

```v-for="(value,key) in obj"```

```v-for="(value,key,index) in obj"```

value为键值，key为键名，index为索引。

在遍历对象时，是按Object.keys()的结果遍历，但是不能保证它的结果在不同的JavaScript引擎下是一致的。

```
<p v-for="(value,key,index) in obj">{{index}}-{{key}}-{{value}}></p>
```

```
data:{
  obj:{
      name:'CJ',
      age:25
  }
}
```

#### 使用值范围

v-for="count in 10"

```
<p v-for="count in 10">{{count}}</p>
```

#### KEY

每次循环时，使用key标识当前项的唯一身份

为什么需要这样做? 详见12A.列表渲染绑定KEY演示.html

1. key可以使用v-bind绑定，即v-bind:key。也可以手动绑定唯一值。

2. key绑定的属性只能是number或string类型。

## Diff算法

#### 起因

首先，渲染真实的DOM的开销是很大的，比如有时候我们要修改某个数据，如果直接渲染到真实的DOM上会引起整个DOM树的重绘和重排。

那么有没有可能只更新我们要修改的那一小部分DOM而不用更新整个DOM呢？

#### Virtual DOM

Vue将真实DOM抽象成一个由诸多节点（这种节点称为VNode，JS对象）组成的虚拟DOM。

以VNode模拟真实的DOM元素，我们可以对这棵虚拟DOM进行创建节点、删除节点以及修改节点等操作。

真实DOM

```
<div class="test">
    <span class="demo">hello,VNode</span>
</div>
```

抽象后的虚拟DOM

```
{
    tag: 'div'
    data: {
        class: 'test'
    },
    children: [
        {
            tag: 'span',
            data: {
                class: 'demo'
            }
            text: 'hello,VNode'
        }
    ]
}
```

// 2019-06-06

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