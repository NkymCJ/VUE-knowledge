import Vue from 'vue';
import Router from 'vue-router';
// import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home';
import Activity from '@/components/Activity';
import Shopcart from '@/components/Shopcart';
import My from '@/components/My';
import Goods from '@/components/Goods';
import Detail from '@/components/Detail';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }, {
      path: '/activity',
      name: 'Activity',
      component: Activity
    }, {
      path: '/shopcart',
      name: 'Shopcart',
      component: Shopcart
    }, {
      path: '/my',
      name: 'My',
      component: My
    }, {
      path: '/goods',
      name: 'Goods',
      component: Goods
    }, {
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
});
