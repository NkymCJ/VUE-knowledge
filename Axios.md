1. `npm install axios --save-dev` 安装axios。

2. `import Axios from 'axios';` 导入axios包。

3. `Axios.defaults.baseURL = "http://localhost:8081/api/";` 设置源地址。

使用：

1. `Vue.prototype.$axios = Axios;` 

在vue原型上注册。以后使用this.$axios就可以发送请求了。(不推荐：在原型上注册会污染，而且不便于管理)

2. 每次都导入包，再使用。(不推荐：每次都要导入包)

``` JS
import Axios from "axios";

Axios.get("/xx").then();
```