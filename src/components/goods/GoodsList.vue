<template>
    <div class="goodslist-container">
        <div class="product" v-for="item in goodslist" :key="item.id" @click="getDetail(item.id)">
            <div class="product-iWrap">
                <div class="productImg-wrap">
                   <img :src="item.img_url">
                </div>
            </div>
            <div class="content">
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
            
        <mt-button size="large" type="danger" @click="getMore()">加载更多</mt-button>
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
        //获取商品列表
        getGoodsList() {
            this.$http.get('api/getgoods?pageindex=' + this.pageindex).then(result=>{
                if(result.body.status === 0) {
                    this.goodslist = this.goodslist.concat(result.body.message);
                } else {
                    Toast("获取商品列表失败！");
                }
            });
        },
        //加载更多
        getMore() {
            this.pageindex++;
            this.getGoodsList();
        },
        //点击跳转图片详情页
        getDetail(id) {
            this.$router.push({name: "goodsinfo",params: {
                id: id
            }});
        }

    }
}
</script>

<style lang="less" scoped>
.goodslist-container {
    .product {
        
        float: left;
       
        width: 48%;
        padding: 0 2%;
        border:1px solid #eee;
        &:hover {
            background-color: #eee;
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
        .content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
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
                word-break: break-all;
                min-height: 42px;
                max-height: 42px;
                overflow: hidden;
                &:hover {
                    color: red;
                }
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
}
</style>


