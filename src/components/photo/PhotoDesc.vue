<template>
    <div class="photodesc-container">
        <div class="header">
            <h3>{{desc.title}}</h3>
            <hr>
        </div>
        <div class="content">
            <p v-html="desc.content"></p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            desc: {},
            id: this.$route.params.id
        }
    },
    created() {
        this.getDesc()
    },
    methods: {
        getDesc() {
            this.$http.get('api/goods/getdesc/' + this.id).then(result=> {
                if(result.body.status === 0) {
                    this.desc = result.body.message[0];
                } else {
                    Toast("获取商品图文详情失败！");
                }
            });
        }
    }
   
}
</script>

<style lang="less">
.photodesc-container {
    .header {
        h3 {
            font-size: 20px;
        }
    }
    .content {
        img {
            width: 100%;
            // height: 100%;
            vertical-align: middle;
        }
    }
}
</style>


