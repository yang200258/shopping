<template>
    <div class="numberbox">
        购买数量:
        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='max'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged()" ref="number" />
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
import mui from '../../../lib/mui/js/mui.min.js'
import '../../../lib/mui/css/mui.min.css'
import '../../../lib/mui/css/app.css'
export default {
    data() {
        return {
        }
    },
    props: ["max"],
    mounted() {
        mui.init();
    },
    methods: {
        //数值改变调用该函数将参数传递至GoodsInfo组件
        countChanged() {
            this.$emit('getCount',parseInt(this.$refs.number.value));
        }
    },
    //因GoodsInfo为异步操作获取商品库存，在传值前就赋值，导致undefined，所以需要监听
    watch: {
        'max': function(newVal,oldVal) {
            mui(".mui-numbox").numbox().setOption("max",newVal);
        }
    }
}
</script>

<style lang="less" scoped>

</style>


