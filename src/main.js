// 引入vue插件    ----还需要在webpack.config.js中设置
// resolve: {
//     alias: {
//       // "vue$": "vue/dist/vue.js"
//     }
//   }
import Vue from '../node_modules/vue/dist/vue.js';

// 引入VueRouter
import VueRouter from 'vue-router';
// 引入router路由模块
import router from './router.js'

//挂载使用路由模块
Vue.use(VueRouter);
// 引入app模板
import app from './App.vue'


// 引入mint-ui组件
import { Header } from 'mint-ui';
//引入mint-ui样式文件
import 'mint-ui/lib/style.css'

// 将mint-ui组件挂载至Vue组件
Vue.component(Header.name,Header);

//引入mui样式 字体  js文件
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui.ttf'
import './lib/mui/fonts/mui-icons-extra.ttf'



// 创建vue实例
var vm = new Vue({
    el:'#app',
    router,
    // 渲染路由模块
    render: c => c(app)
});