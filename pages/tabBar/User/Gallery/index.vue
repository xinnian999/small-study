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
				<scroll-view scroll-y="true" style="height: 100%;">
					<view class="list">
						<view class="imageItem" v-for="item in currentList" :key="item.url">
							<image class="image" :src="item.url" />

							<view class="info">
								<view class="title">
									{{item.title}}
								</view>

								<button type="primary" size="mini">
									选这张
								</button>
							</view>
						</view>
					</view>

				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		onMounted,
		ref
	} from 'vue';
	import * as galleryApi from '@/api/gallery.js';
	import galleryType from '@/utils/galleryType';
	import {
		useGalleryStore
	} from "./store"

	const galleryStore = useGalleryStore()

	const q = ref('')

	const currentType = ref('plant')

	const currentList = computed(() => galleryStore.list.filter(item => item.type === currentType.value))

	const handleTypeClick = (item) => {
		currentType.value = item.value
	}

	const goUpload = () => {
		uni.navigateTo({
			url: '/pages/tabBar/User/Gallery/Upload'
		})
	}

	onMounted(galleryStore.fetchTypeList)
</script>

<style lang="scss">
	.Gallery {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;

		.toolbar {
			width: 100%;
			background-color: #fff;
			border-bottom: 1px solid #eee;
			display: flex;

			.upload {
				display: flex;
				align-items: center;
				padding-right: 10px;
			}
		}

		.main {
			display: flex;
			flex: 1;
			overflow: hidden;

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
				overflow: hidden;
				background-color: #fff;


				.list {
					display: flex;
					flex-direction: column;
					gap: 15px;
					padding: 10px 15px;
				}

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