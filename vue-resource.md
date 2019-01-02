# VUE

VUE 学习

### vue-resource

[vue-resource github url](https://github.com/pagekit/vue-resource "vue-resource")

示例
```
// 配置全局的根节点和返回数据格式
Vue.http.options.root = 'http://api_local.io/API_simple/';
Vue.http.options.emulateJSON = true;
// VUE实例
var vm = new Vue({
    el: '#app',
    data() {
        return {
            name: "",
            list: []
        }
    },
    methods: {
        // 获取成员列表
        getAllList() {
            this.$http.get('search.php', {
                params: {
                    page_no: 1,
                    page_size: -1 // 获取所有
                }
            }).then(result => {
                var result = result.body;
                if (result.code === 0) {
                    this.list = result.data.records;
                } else {
                    alert('获取成员列表失败');
                }
            });
        },
        // 添加成员
        add() {
            this.$http.post('add.php', {
                name: this.name
            }).then(result => {
                var result = result.body;
                if (result.code == 0) {
                    this.getAllList();
                    this.name = '';
                } else {
                    alert('添加失败');
                }
            });
        },
        // 删除成员
        del(id) {
            this.$http.get('delete.php', {
                params: {
                    id: id
                }
            }).then(result => {
                var result = result.body;
                if (result.code == 0) {
                    this.getAllList();
                } else {
                    alert('删除失败');
                }
            });
        },
    },
    created() {
        this.getAllList();
    }
})
```
