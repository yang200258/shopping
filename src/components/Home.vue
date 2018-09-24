<template>
    <div class="home-container">
        <!-- 轮播图区域 -->
        <div class="banner">
            <mt-swipe :show-indicators="false" :speed="1500"  >
                <mt-swipe-item v-for="item in bannerList" :key="item.img">
                    <img :src="item.img">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 导航区域 -->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/newslist">
                        <span class="mui-icon mui-icon-extra mui-icon-extra-dictionary"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/photolist">
                        <span class="mui-icon mui-icon-extra mui-icon-extra-share"></span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/goodslist">
                        <span class="mui-icon mui-icon-extra mui-icon-extra-class"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-extra mui-icon-extra-comment"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-extra mui-icon-extra-computer"></span>
                        <div class="mui-media-body">视频专区</div>
                    </a>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <a href="#">
                        <span class="mui-icon mui-icon-extra mui-icon-extra-peoples"></span>
                        <div class="mui-media-body">联系我们</div>
                    </a>
                </li>
            </ul> 
		</div>

    </div>
</template>
<script>
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            bannerList: []
        }
    },
    created() {
        this.getBanner()
    },
    methods: {
        // 获取轮播图数据
        getBanner() {
            this.$http.get('api/getlunbo').then(result=>{
                if(result.body.status === 0) {
                    this.bannerList = result.body.message;
                } else {
                    Toast({
                        message: "获取轮播图失败！",
                        iconClass: "icon icon-failed"
                    });
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.home-container {
    .banner {
        height: 160px;
        img {
            width: 100%;
            height: 100%;
            }
    }
    .mui-content {
        li {
            border: none;
        }
    }
    .mui-grid-view {
        background-color: #fff;
        border: none;
        li {
            border: 0;
            border-radius: 50%;
            span {
                color: #26A2FF;
            }
        }
    }
}

</style>