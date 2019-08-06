<template>
  <div class="list">
    <div
      class="listitem"
      v-for="item in goodsList"
      :key="item.id"
    >
      <router-link :to="{name: 'Detail',params: {id: item.id}}">
        <img
          class="img"
          :src="item.src"
        />
        <div class="title">{{ item.name }}</div>
        <div class="desc">
          <div class="sell">
            <span>${{ item.price }}</span>
            <s>${{ item.mPrice }}</s>
          </div>
          <div class="detail">
            <div class="hot">热卖中</div>
            <div class="count">剩 {{ item.stock }} 件</div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  data() {
    return {
      goodsList: []
    };
  },
  created() {
    Axios.get("/getGoods")
      .then(res => {
        // console.log(res);
        this.goodsList = res.data.message;
      })
      .catch(err => {
        // console.log(err);
      });
  }
};
</script>
<style scoped>
.list {
  overflow: hidden;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 55px;
}
.listitem {
  width: 50%;
  float: left;
  padding: 5px;
  box-sizing: border-box;
  list-style: none;
  line-height: 20px;
}

.listitem > a {
  overflow: hidden;
}

.listitem > a:not(.mui-btn) {
  margin: 0px;
  padding: 0px;
  border: 1px solid #26a2ff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  width: 100%;
  display: block;
  border-radius: 5px;
}

.title {
  line-height: 25px;
  padding: 0 2px;
  color: #26a2ff;
}

.listitem > a:not(.mui-btn) img {
  width: 100%;
}

.sell {
  overflow: hidden;
  padding: 0 2px;
}

.sell > span {
  float: left;
  color: red;
  text-align: left;
}

.sell > s {
  float: right;
  font-size: 12px;
}

.detail > .hot {
  float: left;
  text-align: left;
  font-size: 12px;
}
.detail > .count {
  float: right;
  text-align: right;
  font-size: 12px;
}
.detail {
  overflow: hidden;
  padding: 0 2px;
}
.desc {
  color: rgba(92, 92, 92, 0.8);
  background-color: rgba(115, 134, 218, 0.2);
}
.img {
  width: 100%;
  vertical-align: top;
}
</style>
