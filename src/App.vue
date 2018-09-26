<template>
    <div class="app-container">
        <!-- 首页头部区域 //mint-uiHeader组件-->
        <div class="header">
           <mt-header fixed title="购物商城">
               <span slot="left" v-show="flag" @click="goBack()">
                    <mt-button icon="back">返回</mt-button>
                </span>
           </mt-header>
            
        </div>
        <!-- 主体区域 -->
        <div class="content">
            <transition> 
            <router-view></router-view>
            </transition>
        </div>
        <!-- 底部区域  mui-tabbar组件   -->
        <div class="tabbar">
            <nav class="mui-bar mui-bar-tab">
                <router-link class="mui-tab-item-add" to="/home">
                    <span class="mui-icon mui-icon-home"></span>
                    <span class="mui-tab-label">首页</span>
                </router-link>
        
                <router-link class="mui-tab-item-add" to="/member">
                    <span class="mui-icon mui-icon-contact mui-icon-icon-contact-filled"></span>
                    <span class="mui-tab-label">会员</span>
                </router-link>
                <router-link class="mui-tab-item-add" to="/shopcar">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span></span>
                    <span class="mui-tab-label">购物车</span>
                </router-link>
                <router-link class="mui-tab-item-add" to="/person">
                    <span class="mui-icon mui-icon-gear-filled"></span>
                    <span class="mui-tab-label">个人中心</span>
                </router-link>
            </nav>
        </div>
        

        
    </div>
</template>

<script>
export default {
    data() {
        return {
            flag: false
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    },
    created() {
        this.flag = this.$route.path === '/home' ? false : true;
        console.log(this.flag);
    },
    watch: {
        '$route.path': function(newVal) {
            if(newVal == '/home') {
                this.flag = false;
            } else {
                this.flag = true;
            }
        }
        
    }
}


</script>

<style lang="less" scoped>
.app-container {
    overflow: hidden;
    .content {
    padding-top: 40px; 
    padding-bottom: 50px;
    }
    .v-enter {
        opacity: 0;
        transform: translateX(100%);
    }
    .v-leave-to {
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
    }
    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
    }
}


//修复因增加图片分享的滑动区域引入mui组件bug
.mui-bar-tab .mui-tab-item-add.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-add {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-add .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-add {
    text-align: center;
    white-space: nowrap;
    color: #929292;
}
.mui-bar-tab .mui-tab-item-add .mui-icon ~ .mui-tab-label[data-v-7ba5bd90] {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-item-add .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>
