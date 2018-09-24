<template>
    <div class="goodslist-container">
        <div class="product" v-for="item in goodslist" :key="item.id">
            <div class="product-iWrap">
                <div class="productImg-wrap">
                   <a href=""><img :src="item.img_url"></a> 
                </div>
            </div>
            <p class="title">{{item.title}}</p>
            <div class="price">
                <p>￥{{item.sell_price}}</p>
                <del> <p>￥{{item.market_price}}</p></del>
            </div>
            
            <div class="productStatus">
                <p>热卖中</p>
                <p>剩余{{item.stock_quantity}}件</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goodslist: [],
            pageindex: 1
        }
    },
    created() {
        this.getGoodsList()
    },
    methods: {
        getGoodsList() {
            this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result=>{
                if(result.body.status === 0) {
                    this.goodslist = result.body.message;
                } else {
                    Toast("获取商品列表失败！");
                }
            });
        }
    }
}
</script>

<style lang="less" scoped>
.goodslist-container {
    .product {
        display: flex;
        float: left;
        flex-direction: column;
        justify-content: space-between;
        width: 48%;
        padding: 0 2%;
        border:1px solid #eee;
        max-height: 250px;
        &:hover {
            border:3px solid red;
        }
        margin-top: 4px;
        &:nth-of-type(2n) {
            margin-left: 4px;
        }
        &:last-of-type {
            margin-bottom: 50px;
        }
        .product-iWrap {
            img {
                width: 100%;
            }
        }
        .price {
            >p {
                color: red;
                font-weight: 700;
                margin :0;
                text-align: center;
            }
        }
        .title {
            min-height: 40px;
            margin: 0;
            font-size: 12px;
            &:hover {
                color: red;
            }
            word-break: break-all;
            
        }
        .price,.productStatus {
            display: flex;
            justify-content: space-between;
            p {
                margin: 0;
            }
        }
        .productStatus {
            font-size: 6px !important;
            
        }
        
        
    }
}
</style>


