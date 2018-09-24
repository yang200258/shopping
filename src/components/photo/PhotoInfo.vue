<template>
    <div class="photoinfo-container">
        <!-- 图片详情头部：标题、时间、浏览次数 -->
        <div class="header">
            <h3>{{photolistinfo.title}}</h3>
            <div class="foot">
                <span>{{photolistinfo.add_time |dataFormat}}</span>
                <span>{{photolistinfo.click}} 次浏览</span>
            </div>
            <hr>
        </div>
        <!-- 图片详情内容：缩略图、内容 -->
        <div class="content">
            <!-- <div class="images" v-for="src in list" :key="src" ">
                <img :src="src" width="50">
            </div> -->
            <viewer :images="list">
                <img v-for="src in list" :key="src" :src="src" width="100" >
            </viewer>
            
            <p v-html="photolistinfo.content"></p>
        </div>
        <!-- 评论部分：引入评论组件  -->
        <div class="comment">
            <cmt-box :id="this.id"></cmt-box>
        </div>
    </div>
</template>

<script>
//引入comment组件
import comment from '../subcomponent/Comment.vue'

export default {
    data() {
        return {
            photolistinfo: {},    //图片详情信息
            id: this.$route.params.id,   //图片ID，由点击时传入
            list: []
        }
    },
    created() {
        this.getPhotoInfoList(),
        this.getImages()
    },
    methods: {
        //获取图片详情信息
        getPhotoInfoList() {
            this.$http.get('api/getimageInfo/' + this.id).then(result=> {
                if(result.body.status === 0) {
                    this.photolistinfo = result.body.message[0];
                } else {
                    Toast({
                        message: "获取图片详情信息失败！",
                        iconClass: "icon icon-failed"
                    });
                }
            });
        },
        //获取缩略图
        getImages() {
            this.$http.get('api/getthumimages/' + this.id).then(result=> {
                if(result.body.status === 0) {
                    result.body.message.forEach(item=> {
                        this.list.push(item.src)
                    });
                } else {
                    Toast({
                        message: "获取缩略图失败！",
                        iconClass: "icon icon-failed"
                    });
                }
            });
        }
    },
    components: {
        "cmt-box": comment
    }
}
</script>


<style lang="less">
.header {
    margin-top: 15px;
    h3 {
        font-size: 16px;
        text-align: center;
    }
    .foot {
        margin-top: 15px;
        display : flex;
        justify-content: space-between;
        color: #bbb;
        span {
            font-size: 14px;
        }
    }
}
.content {
    padding: 4px;
    .images {
        img {
            float: left;
        }
    }
    
}
</style>

