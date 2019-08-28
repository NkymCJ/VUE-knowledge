1. ```npm install webpack-api-mocker --save-dev``` 安装mock。

2. 配置webpack-api-mocker。build文件夹下webpack.dev.conf.js完成如下配置。

``` JS
const apiMocker = require('webpack-api-mocker')
// ...
devServer: {
    // 设置mock
    before(app) {
        apiMocker(app, path.resolve('../myShop/mock/api.js'))
    }
}
```

3. 根目录下新建mock文件夹。mock文件夹下新建api.js。

``` JS
const fs = require('fs') // node中的包。专门用于读取文件中的内容。

const proxy = {
  "GET /api/getSwape": fromJonsFile('Swape')
}

function fromJonsFile(fileName) {
  return (req, res) => {
    // req表示浏览器发送过来的数据
    // res表示返回的数据
    const data = fs.readFileSync(`mock/data/${fileName}.json`).toString();
    const jsonData = JSON.parse(data);
    return res.json(jsonData);
  }
}

module.exports = proxy;
```
