<template>
  <div>
    <mt-swipe
      :auto="4000"
      style="height: 200px;"
    >
      <mt-swipe-item
        style="overflow: hidden;"
        v-for="item in imgList"
        :key="item.id"
      >
        <img
          :src="item.img"
          :alt="item.id"
          class="img"
        >
      </mt-swipe-item>
    </mt-swipe>
    <div class="list">
      <ul>
        <li
          v-for="item in newList"
          :key="item.id"
        >

          <router-link style="color: #26a2ff" :to="item.route">
            <img
              :src="item.src"
              :alt="item.title"
            >
            <p>{{ item.title }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import img from "@/assets/more.png";
// 导入axios
import Axios from "axios";
var newList = [
  {
    id: 1,
    src: img,
    title: "商品",
    route: {
      name: "Goods"
    }
  },
  {
    id: 2,
    src: img,
    title: "商品",
    route: {
      name: "Goods"
    }
  },
  {
    id: 3,
    src: img,
    title: "商品",
    route: {
      name: "Goods"
    }
  },
  {
    id: 4,
    src: img,
    title: "商品",
    route: {
      name: "Goods"
    }
  },
  {
    id: 5,
    src: img,
    title: "商品",
    route: {
      name: "Goods"
    }
  },
  {
    id: 6,
    src: img,
    title: "商品",
    route: {
      name: "Goods"
    }
  }
];

export default {
  name: "Home",
  data() {
    return {
      newList,
      imgList: []
    };
  },
  created() {
    Axios.get("/getSwape").then(res => {
      // console.log(res);
      this.imgList = res.data.message;
    }).catch(err => {
      // console.log(err);
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list {
  width: 100%;
}
.list ul li {
  list-style: none;
  float: left;
  width: 33.33333333%;
  height: 100px;
  text-align: center;
  font-size: 14px;
}
.list ul li a {
  display: inline-block;
  width: 70px;
  height: 50px;
  margin: 0 auto;
  text-decoration: none;
}

.list ul li a img {
  width: 50px;
}

.img {
  height: auto;
  width: 100%;
}
</style>
