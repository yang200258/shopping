<template>
    <div class="app-container">
        <!-- 首页头部区域 //mint-ui--Header组件-->
        <div class="header">
           <mt-header fixed title="购物商城"></mt-header>
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
                <router-link class="mui-tab-item" to="/home">
                    <span class="mui-icon mui-icon-home"></span>
                    <span class="mui-tab-label">首页</span>
                </router-link>
        
                <router-link class="mui-tab-item" to="/member">
                    <span class="mui-icon mui-icon-contact mui-icon-icon-contact-filled"></span>
                    <span class="mui-tab-label">会员</span>
                </router-link>
                <router-link class="mui-tab-item" to="/shopcar">
                    <span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">9</span></span>
                    <span class="mui-tab-label">购物车</span>
                </router-link>
                <router-link class="mui-tab-item" to="/person">
                    <span class="mui-icon mui-icon-gear-filled"></span>
                    <span class="mui-tab-label">个人中心</span>
                </router-link>
            </nav>
        </div>
        

        
    </div>
</template>

<script>
// import mui from './lib/mui/js/mui.min.js'


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

</style>
