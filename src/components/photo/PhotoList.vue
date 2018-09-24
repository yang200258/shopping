<template>
    <div class="photo-container">
        <!-- 图片分享头部区域 -->
        <div class="header">
			<div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a class="mui-control-item mui-active" @click.prevent="getPhotoListById(0)">
						全部
					</a>
					<a class="mui-control-item" v-for="item in categorylist" :key="item.id" @click.prevent="getPhotoListById(item.id)">
						{{item.title}}
					</a>
				</div>
			</div>
        </div>
        <!-- 图片分享内容区域 -->
        <div class="content">
			<ul>
				<router-link v-for="item in imagelist" :key="item.id" tag="li" :to="'/home/photolist/photoinfo/' + item.id">
					<img :src="item.img_url" v-lazy="item.img_url">
					<div class="info">
						<h3>{{item.title}}</h3>
						<p>{{item.zhaiyao}}</p>
					</div>
				</router-link>
			</ul>
        </div>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'

export default {
    data() {
		return {
			categorylist: [],  //图片分类信息
			imagelist: []           //图片数据
		}
	},
	created() {
		this.getAllCategory()
		this.getPhotoListById(0)
	},
	mounted() {
		//初始化mui组件
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005,
			scrollX: true,
			scrollY: false,
			indicators: false
		});
	},
	methods: {
		//获取图片分类数据
		getAllCategory() {
			this.$http.get('api/getimgcategory').then(result=> {
				if(result.body.status === 0) {
					this.categorylist = result.body.message;
				} else {
					Toast({
                        message: "获取图片分类信息失败！",
                        iconClass: "icon icon-failed"
                    });
				}
			});
		},
		//获取图片信息数据
		getPhotoListById(id) {
			this.$http.get('api/getimages/' + id).then(result=> {
				if(result.body.status === 0) {
					this.imagelist = result.body.message;
				} else {
					Toast({
                        message: "获取图片数据失败！",
                        iconClass: "icon icon-failed"
                    });
				}
			})
		}

	}
}
</script>


<style lang="less" scoped>
.header {
	position: fixed;
	top: 40px;
	background-color: #fff;
	z-index: 99;
	.mui-segmented-control.mui-segmented-control-inverted .mui-control-item.mui-active {
		border-bottom: 0;
	}
	
}
div.content {
	margin-top: 40px;
	ul {
		padding: 0 2%;
		margin: 0;
		li {
			list-style: none;
			position: relative;
			img {
				width: 100%;
			}
			image[lazy=loading] {
				width: 40px;
				height: 300px;
				margin: auto;
			}
			.info {
				background-color: rgba(0,0,0,0.1);
				position: absolute;
				bottom: 0;
				color: #fff;
				h3 {
					font-size: 16px;
				}
				p {
					color: #fff;
					word-break: break-all;
				}
			}
		}
	}
}
</style>


