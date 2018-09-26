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


// 按需引入mint-ui组件
// import { Header,Swipe,SwipeItem,Toast,Badge,Button,Lazyload  } from 'mint-ui';
import MintUi from 'mint-ui'
//引入mint-ui样式文件
import 'mint-ui/lib/style.css'
// 将mint-ui组件挂载至Vue组件
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name,Swipe);
// Vue.component(SwipeItem.name,SwipeItem);
// Vue.component(Toast.name,Toast);
// Vue.component(Badge.name,Badge);
// Vue.component(Button.name,Button);
// Vue.use(Lazyload);
Vue.use(MintUi);
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


// //引入vue-preview组件
// import VuePreview from 'vue-preview'
// // 挂载
// Vue.use(VuePreview)

//引入v-viewer组件、样式文件 (缩略图)
import Viewer from 'v-viewer'
import '../node_modules/viewerjs/dist/viewer.css'
//挂载
Vue.use(Viewer)
// 设置
Viewer.setDefaults({
    Options: { "inline": false, "button": true, "navbar": true, "title": true, "toolbar": false, "tooltip": true, "movable": false, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});

//引入vuex，设置公共信息，至购物车
import Vuex from 'vuex'
//挂载
Vue.use(Vuex)
//从本地存储中获取购物车信息
var car = JSON.parse(localStorage.getItem('car') || '[]');
//定义store
const store = new Vuex.Store({
    state: {
        car: car
    },
    mutations: {
        //将添加至购物车的商品信息储存至store中
        addToCar(state,goodsinfo) {
            var flag = false;
            state.car.some(item=> {
                if(item.id === goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })
            if(!flag) {
                state.car.push(goodsinfo);
            }
            //购物车信息储存至本地存储
            localStorage.setItem('car',JSON.stringify(state.car));
            
        },
        //修改购物车中商品数量
        updateGoodsInfo(state,goodsinfo) {
            state.car.some(item=> {
                if(item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count);
                    return true;
                }
            });
            //购物车信息储存至本地存储
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        //删除购物车中商品
        removeGoods(state,id) {
            state.car.some((item,i)=> {
                if(item.id == id) {
                    state.car.splice(i,1);
                    return true;
                }
            });
            //购物车信息储存至本地存储
            localStorage.setItem('car',JSON.stringify(state.car));
        },
        //修改商品选中状态
        updateGoodsSelected(state,info) {
            state.car.some(item=> {
                if(item.id == info.id) {
                    item.selected = info.selected;
                    console.log(info.selected);
                    return true;
                }
            })
            //购物车信息储存至本地存储
            localStorage.setItem('car',JSON.stringify(state.car));
        }
    },
    getters: {
        getAllCount: state=> {
            var c = 0;
            console.log(state.car);
            if(state.car.length > 0) {
                if(state.car) {
                    state.car.forEach((item)=> {
                        c += item.count;
                    })
                }
            }
            
            return c;
        },
        //获取购物车中数量
        getGoodsCount(state) {
            var o = {};
            state.car.forEach(item=> {
                o[item.id] = item.count;
            });
            return o;
        },
        //记录购物车商品状态
        getGoodsSelected(state) {
            var o = {};
            state.car.forEach(item=> {
                o[item.id] = item.selected;
            });
            return o;
        },
        //获取商品总计
        getGoodsAmount(state) {
            var o = {count: 0,amount: 0}
            state.car.forEach(item=> {
                if(item.selected) {
                    o.count += item.count;
                    o.amount += item.count * item.price;
                }
            })
            return o;
        }
    }

});




// 创建vue实例
var vm = new Vue({
    el:'#app',
    router,
    // 渲染路由模块
    render: c => c(app),
    store
});