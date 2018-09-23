// 引入vuerouter组件
import VueRouter from 'vue-router'
// 在router.js中引入App组件
import app from './App.vue';
// 引入tabbar下四个组件
import home from './components/Home.vue'
import member from './components/tabbar/Member.vue'
import shopcar from './components/tabbar/ShopCar.vue'
import person from './components/tabbar/person.vue'

//引入图片分享类组件
import photo from './components/photo/PhotoList.vue'

//引入新闻资讯组件
import newslist from './components/news/NewsList.vue'
import newsinfo from './components/news/NewsInfo.vue'



const router = new VueRouter({
    routes: [
        {path: '/',redirect: '/home'},
        // {path: '/home',component: app},
        {path: '/home',component: home},
        {path: '/member',component: member},
        {path: '/shopcar',component: shopcar},
        {path: '/person',component: person},
        {path: '/home/newslist',component: newslist},
        {path: '/home/newslist/newsinfo/:id',component:newsinfo },
        {path: '/home/photolist',component: photo}
    ],
    linkActiveClass: 'mui-active'
});



export default router
