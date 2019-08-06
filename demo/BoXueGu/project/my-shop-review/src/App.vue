<template>
  <div id="app">
    <mt-header title="首页">
      <router-link
        to="/"
        slot="left"
      >
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button
        icon="more"
        slot="right"
      ></mt-button>
    </mt-header>
    <router-view />
    <mt-tabbar v-model="selected">
      <mt-tab-item id="Home">
        <img
          slot="icon"
          src="./assets/index.png"
        >
        首页
      </mt-tab-item>
      <mt-tab-item id="Activity">
        <img
          slot="icon"
          src="./assets/activity.png"
        >
        活动
      </mt-tab-item>
      <mt-tab-item id="Shopcart">
        <img
          slot="icon"
          src="./assets/shopcart.png"
        >
        购物车
      </mt-tab-item>
      <mt-tab-item id="My">
        <img
          slot="icon"
          src="./assets/my.png"
        >
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      selected: "Home"
    };
  },
  watch: {
    selected(newValue, oldValue) {
      // console.log(newValue);
      // console.log(oldValue);
      // console.log(this.selected);
      this.$router.push({
        // name: newValue
        name: this.selected
      });
    }
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.mint-tabbar > .mint-tab-item.is-selected {
  color: #26a2ff;
}

.mint-tab-item {
  color: #666;
}

.mint-tabbar {
  position: fixed;
}

.mint-header {
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
}
</style>
