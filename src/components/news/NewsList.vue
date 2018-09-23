<template>
    <div class="newslist-container">
        <!-- 新闻列表区域     -->
        <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
            <router-link :to="'/home/newslist/newsinfo/' + item.id">
                <!-- 新闻左侧图片  -->
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                <!-- 列表主体 -->
                <div class="mui-media-body">
                    <!-- 标题 -->   
                    <h4>{{item.title}}</h4>
                    <!-- 内容 -->
                    <p class='mui-ellipsis'>{{item.zhaiyao}}</p>
                    <!-- 底部内容 -->
                    <div class="foot">
                        <span>发表时间：{{item.add_time | dataFormat()}}</span>
                        <span>点击数： {{item.click}}</span>
                    </div>
                    
                </div>
            </router-link>
        </li>
</div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            newslist: []
        }
    },
    created() {
        this.getNewsList()
    },
    methods: {
        //获取新闻列表
        getNewsList() {
            this.$http.get('api/getnewslist').then(result=> {
                if(result.body.status === 0) {
                    this.newslist = result.body.message;
                } else {
                    Toast({
                        message: "获取新闻列表失败！",
                        iconClass: "icon icon-failed"
                    });
                }
            }) 
        }
    }
}
</script>

<style lang="less" scoped>
.newslist-container {
    li {
        list-style: none;
        margin-right: 10px;
        img {
            width: 60px;
            height: 60px;
            overflow: hidden;
            padding-top: 11px;
        }
        .mui-media-body {
            overflow: hidden;
            padding-left: 4px;
            h4 {
                font-size: 16px;
                color:#26A2FF;
                overflow: hidden;
            }
            .foot {
                display: flex;
                justify-content: space-between;
                span {
                    font-size: 10px;
                    color: #bbb;
                }
            }
        }
        
        
    }
    
}
</style>


  