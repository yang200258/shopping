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

//引入vue-resource模块
import vueresource from 'vue-resource'
//挂载vue-resource模块至VUe
Vue.use(vueresource)

// 引入app模板
import app from './App.vue'


// 引入mint-ui组件
import { Header,Swipe,SwipeItem,Toast,Badge,Button } from 'mint-ui';
//引入mint-ui样式文件
import 'mint-ui/lib/style.css'
// 将mint-ui组件挂载至Vue组件
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Toast.name,Toast);
Vue.component(Badge.name,Badge);
Vue.component(Button.name,Button);
//引入mui样式 字体  js文件
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import './lib/mui/fonts/mui.ttf'
import './lib/mui/fonts/mui-icons-extra.ttf'
import VueResource from 'vue-resource';
import { isMoment } from 'moment';


//设置获取数据接口URL地址
Vue.http.options.root = 'http://www.liulongbin.top:3005/';
//设置vue-resource的ajax请求数据格式
Vue.http.options.emulateJSON = true;


// 引入moment组件
import moment from 'moment'
//设置时间过滤器
Vue.filter('dataFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern);
});


// 创建vue实例
var vm = new Vue({
    el:'#app',
    router,
    // 渲染路由模块
    render: c => c(app)
});