<template>
    <div class="goodsinfo-container">
        <!-- 轮播图部分 -->
        <div class="banner">
            <mt-swipe :show-indicators="false" :speed="1500"  >
                <mt-swipe-item v-for="item in bannerlist" :key="item.src">
                    <img :src="item.src">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 购买区域部分 -->
        <div class="buy">
            <div class="mui-card">
				<div class="mui-card-header">
                    <h3>{{goodsinfo.title}}</h3>   
                    <hr>
                </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<p>销售价：￥{{goodsinfo.sell_price}}</p>
                        <p>市场价：￥{{goodsinfo.sell_price}}</p>
					</div>
                    <div class="numberbox">
                        
                        <number-box @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></number-box>
                    </div>
                    
				</div>
				<div class="foot">
                    <mt-button size="normal" type="primary">立即购买</mt-button>
                    <mt-button size="normal" type="danger" @click="addShopCar()">加入购物车</mt-button>
                </div>
			</div>
        </div>
        <!-- 库存量部分 -->
        <div class="quantity">
            <div class="mui-card">
				<div class="mui-card-header">
                    <p>商品参数</p>  
                </div>
				<div class="mui-card-content">
					<p>商品货号：{{goodsinfo.goods_no}}</p>
                    <p>库存情况：{{goodsinfo.stock_quantity}}</p>
                    <p>上架时间：{{goodsinfo.add_time | dataFormat()}}</p>
				</div>
			</div>
        </div>
        <!-- 底部区域 -->
        <div class="footer">
            <mt-button size="large" type="primary" @click="goDesc(goodsinfo.id)">图文详情</mt-button>
            <mt-button size="large" type="danger" @click="goComment()" :id="goodsinfo.id">评论详情</mt-button>
        </div>
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        >
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>  
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import numberbox from '../subcomponent/goodsinfo/NumberBox.vue'
export default {
    data() {
        return {
            bannerlist: [],   //商品轮播图数据
            id: this.$route.params.id,   // 利用this.$router.push传输的参数
            goodsinfo: {}, // 商品上架详细信息
            ballFlag: false, //加入购物车小球动画标签
            selectedcount: 1   // 默认选中商品数量
        }
    },
    created() {
        this.getBannerList(),
        this.getGoodsInfo()
    },
    methods: {
        //获取商品轮播图
        getBannerList() {
            this.$http.get('api/getthumimages/' + this.id).then(result=> {
                if(result.body.status === 0) {
                    this.bannerlist = result.body.message;
                } else {
                    Toast("获取商品轮播图失败！")
                }
            });
        },
        //获取商品信息
        getGoodsInfo() {
            this.$http.get('api/goods/getinfo/' + this.id).then(result=> {
                if(result.body.status === 0) {
                    this.goodsinfo = result.body.message[0];
                } else {
                    Toast("获取商品信息详情失败！");
                }
            })
        },
        //点击跳转至商品图文详情
        goDesc(id) {
            this.$router.push({name:"photodesc",params: {
                id: this.id
            }});
        },
        //点击跳转至商品评论详情
        goComment() {
            this.$router.push({name:"goodscomment"});
        },
        //添加购物车动画
        addShopCar() {
            var goodsinfo = {
                id: this.id,
                count: this.selectedcount,
                price: this.goodsinfo.sell_price,
                selected: true
            }
            this.$store.commit('addToCar',goodsinfo);
            this.ballFlag = !this.ballFlag;
        },
        beforeEnter(el) {
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            el.style.transform = 'translate(0,0)';
        },
        enter(el,done) {
            el.offsetWidth;
            //计算移动距离
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            const badgePosition = document.getElementById("badge")
                                    .getBoundingClientRect();
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;
            //实现位移
            el.style.transform = 'translate(' + xDist + "px" + ',' + yDist  + 'px)';
            el.style.transition = 'all 1s ease';
            done();
        },
        afterEnter(el) {
            this.ballFlag = !this.ballFlag;
        },
        //父组件想numberbox传递方法，获取到numberbox中传递过来的参数
        getSelectedCount(count) {
            this.selectedcount = count;
        }
    },
    components: {
        "number-box": numberbox
    }
}
</script>

<style lang="less" scoped>
.goodsinfo-container {
    .banner {
        height: 300px;
        text-align: center;
        // height: 760px;
        img {
            // width: 100%;
            height: 100%;
        }
    }
    .buy {
        .mui-card {
            margin: 0;
            h3 {
                color: rgb(112, 156, 119);
            }
        }
        .mui-card-content {
            padding: 6px;
            .mui-card-content-inner {
                display: flex;
                justify-content: space-between;
                p {
                    font-size: 16px;
                    font-weight: 700;
                    &:first-of-type {
                        color: red;
                    }
                }
            }
            .numberbox {
                margin-left: 6px;
                font-size: 18px;
                font-weight: 700;
                position: relative;
            }
        }
        .foot {
            margin: 16px 0;
            padding-left: 15px;
        }

        
    }
    .quantity {
        .mui-card {
            margin: 0;
            .mui-card-header {
                padding: 0;
                p {
                    margin: 0;
                }
                hr {
                    margin: 0;
                }
            }
        }
    }
    .footer {
        button {
            margin-top: 20px;
        }
    }
    .ball {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 999;
        left: 152px;
        top: 510px;
    }
}
</style>
