<template>
    <div class="numbox-container">
        <div class="numberbox">
        购买数量:
        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
            
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            
            <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbox" />
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
    </div>
</template>
<script>
import mui from '../../lib/mui/js/mui.min.js'
import '../../lib/mui/css/mui.min.css'
import '../../lib/mui/css/app.css'
export default {
    data() {
        return {
        }
    },
    mounted() {
        mui(".mui-numbox").numbox();
    },
    props: ["initcount","goodsid"],
    methods: {
        countChanged() {
            this.$store.commit('updateGoodsInfo',{
                id:this.goodsid,
                count: this.$refs.numbox.value
            });
        }
    },
    //因GoodsInfo为异步操作获取商品库存，在传值前就赋值，导致undefined，所以需要监听
    watch: {
        
    }
}
</script>

<style lang="less" scoped>
.mui-numbox {
    display: inline-block;
}
</style>
