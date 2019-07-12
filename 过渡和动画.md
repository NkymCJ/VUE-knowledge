# VUE

VUE 学习

### transition&&animation

1. 使用 **transition** 元素把需要被动画控制的元素包裹起来

2. 指定过渡类名的样式，来控制 **transition** 内部元素实现动画

3. 过渡类名
    
    ![transition](images/transition.png 'transition')

    - **v-enter** [时间点]
    - **v-enter-to** [时间点]
    - **v-enter-active** [时间段]
    - **v-leave** [时间点]
    - **v-leave-to** [时间点]
    - **v-leave-active** [时间段]

4. 若使用 **transition** 元素没有指定 **name** 属性，则 **v-** 是自定义样式类名的默认前缀

5. 示例

    ```
    <!-- STYLE -->
    .my-enter,
    .my-leave-to{
        opacity: 0;
        transform: translateX(80px)
    }
    .my-enter-active,
    .my-leave-active{
        transition: all 0.4s ease;
    }
    <!-- HTML -->
    <div id="app">
        <input type="button" value="toggle" @click="flag = !flag">
        <!-- name 不写默认 v-开头的样式 -->
        <transition name="my">
            <p v-if="flag">Hello World</p>
        </transition>
    </div>
    <!-- SCRIPT -->
    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                flag: false
            }
        }
    });
    ```