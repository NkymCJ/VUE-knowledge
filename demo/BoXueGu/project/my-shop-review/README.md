# my-shop-review

> A Vue.js project

## Build Setup

```

npm install webpack webpack-cli -g

npm install vue-cli -g

npm init webpack x

cd x

npm run dev

npm install mint-ui -S

import MintUI from 'mint-ui';

import 'mint-ui/lib/style.css';

Vue.use(MintUI);

npm install webpack-api-mocker -S

const apiMocker = require('webpack-api-mocker);

devServer: {
    before(app) {
        apiMocker(app, path.resolve('../x/mock/api.js'));
    }
}

const fs = require('fs');
function fromJsonFile(fileName) {
    return (req, res) => {
        const data = fs.readFileSync(`mock/data/${fileName}.json`).toString();
        const json = JSON.parse(data);
        return res.json(json);
    }
}
const proxy = {
    'GET /api/getSwape': fromJsonFile('Swape');
};
module.exports = proxy;

npm install axios -S

import Axios from 'axios';
Axios.default.baseURL = 'http://localhost:8080/api/';

import Axios from 'axios';
Axios.get('/getSwape').then(res => {
    console.log(res);
});

```
