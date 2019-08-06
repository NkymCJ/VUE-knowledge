const fs = require('fs');
function fromJsonFile(fileName) {
    return (req, res) => {
        const data = fs.readFileSync(`mock/data/${fileName}.json`).toString();
        const json = JSON.parse(data);
        return res.json(json);
    }
}

function fromJsonDetail(fileName) {
    return (req, res) => {
        console.log(req);
        const data = fs.readFileSync(`mock/data/${fileName}.json`).toString();
        const json = JSON.parse(data);
        var result = {};
        for (var i= 0;i<json.message.length;i++) {
            if(json.message[i].id === Number(req.params.id)){
                result = {
                    "status": 0,
                    "message": [json.message[i]]
                }
                break;
            }
        }
        return res.json(result);
    }
}

const proxy = {
    'GET /api/getSwape': fromJsonFile('Swape'),
    'GET /api/getGoods': fromJsonFile('Goods'),
    'GET /api/getDetail/:id': fromJsonDetail('Detail'),
}

module.exports = proxy;