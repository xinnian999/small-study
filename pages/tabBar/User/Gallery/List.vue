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

								<button type="primary" size="mini" @click="handleSelect(item)">
									选这张
								</button>
							</view>
						</view>
					</view>

				</scroll-view>
			</view>

		</view>

		<uni-goods-nav @click="footLeftClick" :fill="true" class="footer" :options="options" :buttonGroup="buttonGroup"
			@buttonClick="footRightClick" />

		<uni-popup ref="selectedPopup" style="z-index: 999;" type="bottom" border-radius="10px 10px 0 0">
			<view class="selectedPopup">
				<view class="topbar">
					<button size="mini" type="primary">清空购物车</button>

					<uni-icons type="closeempty" size="30" @click="selectedPopup.close"></uni-icons>
				</view>
				<scroll-view scroll-y="true" style="height: calc(100% - 43px);">
					<uni-list v-if="selected.length" class="list">
						<uni-list-item v-for="item in selected" :key="item.url" :title="item.title" :thumb="item.url"
							thumb-size="lg" rightText="大图">
							<template v-slot:header>
								<image class="image" :src="item.url" />
							</template>
							<template v-slot:footer>
								<view class="verticalCenter">
									<button size="mini">移除</button>
								</view>
							</template>
						</uni-list-item>
					</uni-list>

					<view class="empty" v-else>
						购物车空空如也～～
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		computed,
		onMounted,
		ref,
		watchEffect
	} from 'vue';
	import * as galleryApi from '@/api/gallery.js';
	import galleryType from '@/utils/galleryType';
	import {
		useGalleryStore
	} from "./store"

	const galleryStore = useGalleryStore()

	const q = ref('')

	const selectedPopup = ref()

	const selected = ref([])

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

	const handleSelect = (item) => {
		selected.value.push(item)
		uni.showToast({
			title: '已加入购物车'
		})

	}

	const options = computed(() => [{
		icon: 'cart',
		text: '购物车',
		info: selected.value.length
	}])

	const buttonGroup = [{
			text: '批量改名',
			backgroundColor: '#ffa200',
			color: '#fff'
		},
		{
			text: '批量删除',
			backgroundColor: '#ff0000',
			color: '#fff'
		}
	]

	const footLeftClick = (e) => {
		if (e.index === 0) {
			selectedPopup.value.open()
		}
	}

	const footRightClick = async (e) => {
		if (e.index === 1) {
			const {
				confirm
			} = await uni.showModal({
				title: '确认删除这些图片吗？',
			})

			if (!confirm) return

			const ids = selected.value.map(item => item.id)
			const {
				statusCode
			} = await galleryApi.remove({
				ids
			})
			if (statusCode === 201) {
				galleryStore.fetchList()
				uni.showToast({
					title: '删除成功'
				})
			}
		}
	}

	onMounted(galleryStore.fetchList)
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


		.footer {
			flex: none;
		}

		.selectedPopup {
			height: 60vh;
			background-color: #fff;
			z-index: 999;
			border-radius: 10px 10px 0 0;
			display: flex;
			flex-direction: column;
			padding: 10px;

			button {
				margin: 0;
			}

			.topbar {
				display: flex;
				margin-bottom: 10px;
				justify-content: space-between;
			}

			.list {
				flex: 1;

				.image {
					width: 100px;
					height: 60px;
					border: 1px solid #eee;
					border-radius: 6px;
					margin-right: 10px;
				}
			}


		}


	}
</style>