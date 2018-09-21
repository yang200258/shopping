// 引入vuerouter组件
import VueRouter from 'vue-router'
// 在router.js中引入App组件
import app from './App.vue';

const router = new VueRouter({
    routes: [
        {path: '/home',component: app}
    ]
});



export default router
