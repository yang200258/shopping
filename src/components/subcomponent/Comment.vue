<template>
    <div class="comment-container">
        <!-- 评论列表 -->
        <div class="commentlist">
            <!-- 提交评论部分 -->
            <div class="add_comment">
                <h3>提交评论</h3>
                <textarea name="" id="text" cols="40" rows="3" v-model="comment_content"></textarea>
                <mt-button type="primary" @click="addComment">提交</mt-button>
            </div>
            <!-- 评论列表头部 -->
            <div class="title">
                <h3>评论列表</h3>
                <hr>
            </div>
            <!-- 评论列表内容部分 -->
            <div class="content" v-for="(item,i) in commentlist" :key="item.add_time">
                <!-- 评论头部 -->
                <div class="up">
                    <span>{{ i+ 1}}楼： 用户：{{item.user_name}}   发表时间：{{item.add_time | dataFormat}}</span>
                </div>
                <!-- 评论内容 -->
                <div class="down">
                    <p>{{item.content}}</p>
                </div>
            </div>
        </div>
        <!-- 加载更多按钮 -->
        <mt-button id="btn" type="danger" size="large" plain @click="getMore()">加载更多</mt-button>
    </div>
</template>
<script>
//引入提示框组件
import { Toast } from 'mint-ui'

export default {
    
    data() {
        return {
            commentlist: [],
            pageIndex : 1,
            comment_content: ''
        }
    },
    props: ["id"],
    created() {
        this.getComments()
    },
    methods: {
        // 获取评论数据
        getComments() {
            this.$http.get('api/getcomments/'+ this.id + '?pageindex=' + this.pageIndex).then(result=> {
                if(result.body.status === 0) {
                    this.commentlist = this.commentlist.concat(result.body.message);
                } else {
                    Toast({
                        message: "获取评论失败！",
                        iconClass: "icon icon-failed"
                    });
                }
            });
        },
        //点击“加载更多”按钮，增加评论
        getMore() {
            this.pageIndex++;
            this.getComments();
        },
        //添加评论功能
        addComment() {
            if(this.comment_content.trim().length === 0) {
                Toast({
                    message: "评论内容为空，请编辑后再次提交！",
                    iconClass: "icon icon-failed"
                });
            } else {
                this.$http.post('api/postcomment/' + this.id,
                {content: this.comment_content.trim()}).then(result=>{
                    if(result.body.status === 0 ) {
                        const cmt = {user_name: "匿名用户",add_time: Date.now(),content: this.comment_content.trim()};
                        this.commentlist.unshift(cmt);
                        this.comment_content = '';
                    } else {
                        Toast({
                            message: "评论内容为空，请编辑后再次提交！",
                            iconClass: "icon icon-failed"
                        });
                    }
                });
            }
        }
    }
}
</script>


<style lang="less" scoped>
.comment-container {
    .add_comment {
        margin-top: 40px;
        h3 {
            font-size: 20px;
        }
        #text {
            // overflow: hidden;
            // background-color: #fff;
            padding: 0;
            font-size: 12px
            // text-overflow:ellipsis
        }
    }
    .title {
        padding-top: 40px;
    }
    .content {
        margin-top: 10px;
        font-size: 14px;
        color: #aaa;
        .up {
            background-color: #eee;
        }
        .down {
            padding-top: 4px;
            padding-left: 4px;
            p {
                word-wrap:break-word;
                white-space: pre-wrap;
            }
        }
    }
    #btn {
        &:click {
            background-color: red;
            // color:#fff;
        }
    }
    
}
</style>
