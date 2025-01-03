<template>
	<view class="Gallery">
		<view class="toolbar">
			<uni-search-bar style="flex: 1;" :focus="true" v-model="q" cancelButton="none" />

			<view class="upload">
				<button type="primary" size="mini" @click="goUpload">上传</button>
			</view>
		</view>

		<view class="main">
			<view class="left">
				<view v-for="item in galleryType" :key="item.value" class="typeItem"
					:class="{isActive:item.value===currentType}" @click="handleTypeClick(item)">
					{{item.label}}
				</view>
			</view>

			<view class="right">
				<view class="imageItem" v-for="item in list" :key="item.url">
					<image class="image" :src="item.url" />

					<view class="info">
						<view class="title">
							图片标题
						</view>

						<button type="primary" size="mini">
							选这张
						</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import * as galleryApi from '@/api/gallery.js';
	import galleryType from '@/utils/galleryType';

	const list = ref([])

	const q = ref('')

	const currentType = ref('plant')

	const fetchList = async () => {
		const {
			statusCode,
			data
		} = await galleryApi.list()

		list.value = data
	}

	const handleTypeClick = (item) => {
		currentType.value = item.value
	}
	
	const goUpload=()=>{
		uni.navigateTo({
			url:'/pages/tabBar/User/Gallery/Upload'
		})
	}

	onMounted(fetchList)
</script>

<style lang="scss">
	.Gallery {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;

		.toolbar {
			width: 100%;
			background-color: #fff;
			border-bottom: 1px solid #eee;
			display: flex;
			
			.upload{
				display: flex;
				align-items: center;
				padding-right: 10px;
			}
		}

		.main {
			display: flex;
			flex: 1;

			.left {
				width: 30%;

				.typeItem {
					width: 100%;
					line-height: 50px;
					text-align: center;
				}

				.isActive {
					background-color: #007aff;
					color: #fff;
				}
			}

			.right {
				flex: 1;
				padding: 10px 15px;
				background-color: #fff;
				display: flex;
				flex-direction: column;
				gap: 15px;


				.imageItem {
					height: 100px;
					display: flex;
					gap: 15px;

					.image {
						width: 150px;
						height: 100%;
						border: 1px solid #eee;
						border-radius: 6px;
					}

					.info {
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.title {}
					}
				}
			}
		}


	}
</style>