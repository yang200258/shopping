<template>
    <div class="shopcar-container">
       <div class="goods">
           <div class="mui-card" >
				<div class="mui-card-header" v-for="item in goodslist" :key="item.id">
                    <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                    <img :src="item.thumb_path">
                    <div class="right">
                        <p class="title">{{item.title}}</p>
                        <p  class="price">￥{{item.sell_price}}</p>
                        <numbox  :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                        <a @click.prevent="deleteGoods(item.id)">删除</a>
                    </div>
                </div>
            </div>
       </div>
       <div class="compute">
           <p>合计：</p> <p>{{$store.getters.getGoodsAmount.amount}}</p>
           <!-- <p>结算：</p> -->
       </div>
    </div>
</template>

<script>

//导入商品模块的numbox
import numbox from '../shopcar/Numbox.vue'
export default {
    data() {
        return {
            goodslist: [], // 购物车信息列表
            selectFlag: true
        }
    },
    created() {
        this.getGoodsList()
        
    },
    methods: {
        getGoodsList() {
            var idArr = [];
            if(this.$store.state.car) {
                this.$store.state.car.forEach(item => {
                    idArr.push(item.id)
                });
            }
            if(idArr.length <= 0) {
                return;
            } else {
                this.$http.get('api/goods/getshopcarlist/' + idArr.join(',')).then(result=> {
                    if(result.body.status === 0) {
                        this.goodslist= result.body.message;
                    } else {
                        Toast("获取购物车数据失败！");
                    }
                })
            }
        },
        //删除操作
        deleteGoods(id) {
            this.$store.commit('removeGoods',id);
            this.getGoodsList();
        },
        //记录选中状态
        selectedChanged(id,val) {
            this.$store.commit('updateGoodsSelected',{
                id: id,
                selected: val
            });
        }
    },
    components: {
        "numbox": numbox
    }
}
</script>

<style lang="less" scoped>
.shopcar-container {
    .goods {
        .mui-card {
            margin: 0;
            .mui-card-header {
                padding: 0;
                img {
                        // height: 50%;
                        // width: 50%;
                        height: 80px;
                        padding-left: 4px;
                    }
                .right {
                    display: flex;
                    justify-content: space-between;
                    flex-direction: column;
                    margin: 0;
                    padding: 10px;
                    .title {
                        font-size: 14px;
                        text-align: left;
                        // display: block;
                        margin: 0;
                    }
                    .price {
                        color: red;
                        margin: 0;
                    }
                    a {
                        color: red;
                        font-size: 12px;
                    }
                }
                
            }
        }
    }
}
</style>

