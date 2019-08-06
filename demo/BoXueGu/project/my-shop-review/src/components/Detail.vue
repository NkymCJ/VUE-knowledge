<template>
  <div class="container">
    <div class="panel">
      <div class="title">商品名称</div>
      <div class="content">
        <div class="one w5">
          <div class="oneName">销售价：</div>
          <div class="oneValue fz16 cRed">${{detail.price}}</div>
        </div>
        <div class="one w5">
          <div class="oneName">市场价：</div>
          <div class="oneValue fz16 cRed">${{detail.mPrice}}</div>
        </div>
        <div class="one">
          <div class="oneName">总价：</div>
          <div class="oneValue fz16 cRed">${{allPrice}}</div>
        </div>
        <div class="one">
          <div class="oneName">购买数量：</div>
          <div class="oneValue">
            <input
              type="text"
              v-model="count"
            >
          </div>
        </div>
        <div
          class="one"
          style="margin: 5px 0;"
        >
          <mt-button
            type="primary"
            style="margin-right: 5px;"
          >立即购买</mt-button>
          <mt-button type="danger">加入购物车</mt-button>
        </div>
      </div>
    </div>
    <div class="panel">
      <div class="one">
        <div class="oneName">商品货号：</div>
        <div class="oneValue">{{detail.id}}</div>
      </div>
      <div class="one">
        <div class="oneName">库存情况：</div>
        <div class="oneValue">{{detail.stock}}</div>
      </div>
      <div class="one">
        <div class="oneName">上架时间：</div>
        <div class="oneValue">{{detail.insertTime}}</div>
      </div>
    </div>
    <div class="panel">
      <mt-button
        type="primary"
        size="large"
        style="margin-bottom: 5px;margin-top: 5px;"
      >图文介绍</mt-button>
      <mt-button
        type="danger"
        size="large"
        style="margin-bottom: 5px;"
      >商品评论</mt-button>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      detail: {},
      price: 0,
      count: 0
    };
  },
  computed: {
    allPrice: function() {
      return this.count * this.price;
    }
  },
  created() {
    Axios.get(`getDetail/${this.$route.params.id}`).then(res => {
      // console.log(res);
      this.detail = res.data.message[0];
      this.price = this.detail.price;
    });
  }
};
</script>

<style scoped>
.container {
  padding: 0 5px;
  padding-top: 45px;
  padding-bottom: 55px;
}

.panel {
  border-radius: 5px;
  padding: 0 5px;
  border: 1px solid #e1e1e1;
  overflow: hidden;
  margin-bottom: 5px;
}

.panel:last-child {
  margin-bottom: 0;
}

.title {
  line-height: 30px;
  font-size: 16px;
  color: #26a2ff;
  border-bottom: 1px solid #e1e1e1;
}

.content {
  overflow: hidden;
}

.one {
  float: left;
  width: 100%;
  display: flex;
  font-size: 12px;
  line-height: 20px;
}

.one.w5 {
  width: 50%;
}

.oneName {
  color: #666;
  align-self: baseline;
}

.oneValue {
  align-self: baseline;
}

.cRed {
  color: red;
}

.fz16 {
  font-size: 16px;
}

input {
  outline: none;
  border: none;
  border: 1px solid #e1e1e1;
  border-radius: 5px;
  width: 50px;
  padding: 5px;
  color: #666;
}
</style>
