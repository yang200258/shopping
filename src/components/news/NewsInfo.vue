<template>
    <div class="newsinfo-container">
        <!-- 头部区域     -->
        <div class="news">
            <div class="header">
                <h3>{{newsinfo.title}}</h3>
                <div class="foot">
                    <span>{{newsinfo.add_time |dataFormat}}</span>
                    <span>{{newsinfo.click}} 次浏览</span>
                </div>
                
                <hr>
            </div>
            <!-- 新闻内容     -->
            <div class="content" >
                <p v-html="newsinfo.content"></p>
            </div>
            <!-- 评论区 -->
            <div class="comment">
                <comment-box :id="this.id"></comment-box>
            </div>
        </div>
    </div>
</template>

<script>
//引入提示框组件
import { Toast } from 'mint-ui'

//引入公共组件
import comment from '../subcomponent/Comment.vue'

export default {
    data() {
        return {
            id: this.$route.params.id,
            newsinfo: {}
        }
    },
    created() {
        this.getNewsInfo()
    },
    methods: {
        //获取对应id的新闻详情
        getNewsInfo() {
            this.$http.get('api/getnew/'+ this.id).then(result=> {
                if(result.body.status === 0) {
                    this.newsinfo = result.body.message[0];
                } else {
                    Toast({
                        message: "获取新闻详情失败！",
                        iconClass: "icon icon-failed"
                    });
                }
            })
        }
    },
    components: {
        'comment-box': comment
    }
    
}
</script>

<style lang="less">
.newsinfo-container {
    padding: 5px;
    .header {
        h3 {
            font-size: 18px;
            text-align: center;
        }
        .foot {
            display : flex;
            justify-content: space-between;
            color: #bbb;
            span {
                font-size: 14px;
            }
        }
    }
    .content {
        img {
            width: 100%!important;
        }
    }
}
</style>


