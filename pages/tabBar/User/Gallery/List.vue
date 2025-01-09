<template>
	<view class="Gallery">
		<view class="toolbar">
			<uni-search-bar style="flex: 1;" :focus="true" v-model="q" cancelButton="none" />

			<view class="upload" v-if="!readonly">
				<button type="primary" size="mini" @click="goUpload">上传</button>
			</view>
		</view>

		<view class="main">
			<view class="left">
				<view v-for="item in leftConfig" :key="item.value" class="typeItem"
					:class="{isActive:item.value===currentType}" @click="handleTypeClick(item)">
					{{item.label}}
				</view>
			</view>

			<view class="right">
				<scroll-view scroll-y="true" style="height: 100%;" @scrolltolower="loadMore" :key="currentType">
					<view class="list" v-if="currentList.length">
						<view class="imageItem" v-for="item in currentList" :key="item.url">
							<image class="image" :src="item.url" lazy-load @click="hanlePreview(item.url)" />

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

					<view class="empty" v-else>
						{{ currentType==='q'?'没有搜到相关图片哟～～':'这个分类下还没有图片～～' }}
					</view>
				</scroll-view>
			</view>

		</view>

		<uni-goods-nav @click="footLeftClick" :fill="true" class="footer" :options="options" :buttonGroup="buttonGroup"
			@buttonClick="footRightClick" />

		<uni-popup ref="selectedPopup" style="z-index: 999;" type="bottom" border-radius="10px 10px 0 0">
			<view class="selectedPopup">
				<view class="topbar">
					<button size="mini" type="primary" @click="selected=[]">清空购物车</button>

					<uni-icons type="closeempty" size="30" @click="selectedPopup.close"></uni-icons>
				</view>
				<scroll-view scroll-y="true" style="height: calc(100% - 43px);">
					<uni-list v-if="selected.length" class="list">
						<uni-list-item v-for="(item,index) in selected" :key="item.url" :title="item.title"
							:thumb="item.url" thumb-size="lg" rightText="大图">
							<template v-slot:header>
								<image class="image" :src="item.url" />
							</template>
							<template v-slot:footer>
								<view class="verticalCenter">
									<button size="mini" @click="handleChatRemove(index)">移除</button>
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
		toRefs,
		watchEffect
	} from 'vue';
	import * as galleryApi from '@/api/gallery.js';
	import galleryType from '@/utils/galleryType';
	import {
		useGalleryStore
	} from "@/stores/gallery.js"
	import {
		useKaStore
	} from "@/stores/knowAdmin.js"
	import {
		uniq,
		uniqBy
	} from 'lodash';

	const galleryStore = useGalleryStore()

	const leftConfig = [
		...galleryType,
		{
			value: 'q',
			label: '搜索',
		}
	]

	const kaStore = useKaStore()

	const {
		list,
		readonly
	} = toRefs(galleryStore)

	const q = ref('')

	const selectedPopup = ref()

	const selected = ref([])

	const page = ref(1)

	const currentType = ref('animal')

	const currentList = computed(() => {
		if (currentType.value === 'q' && q.value) {
			return galleryStore.list.filter(item => item.title.includes(q.value)).slice(0, page.value * 15)
		}

		const source = galleryStore.list?.filter(item => item.type === currentType.value)

		return source.slice(0, page.value * 15)
	})


	const handleTypeClick = (item) => {
		page.value = 1
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

	const buttonGroup = computed(() => {
		if (readonly.value) {
			return [{
				text: '选好了 ✅',
				backgroundColor: '#ffa200',
				color: '#fff'
			}]
		}
		return [{
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
	})

	const footLeftClick = (e) => {
		if (e.index === 0) {
			selectedPopup.value.open()
		}
	}

	const footRightClick = async (e) => {
		if (readonly.value) {

			const {
				statusCode
			} = await galleryApi.addKnowByGallery({
				typeId: kaStore.currentType.id,
				images: selected.value
			})

			if (statusCode === 201) {
				uni.navigateBack()

				kaStore.fetchImageList()

				galleryStore.setReadonly(false)
			}


			return
		}

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
				ids: uniq(ids)
			})
			if (statusCode === 201) {
				galleryStore.fetchList()
				selected.value = []
				uni.showToast({
					title: '删除成功'
				})
			}
		}

		if (e.index === 0) {
			const {
				confirm,
				content
			} = await uni.showModal({
				title: '批量改名',
				editable: true,
				placeholderText: '请输入新的图片名称'
			})

			if (!confirm) return

			const ids = selected.value.map(item => item.id)
			const {
				statusCode
			} = await galleryApi.rename({
				ids: uniq(ids),
				title: content
			})
			if (statusCode === 201) {
				galleryStore.fetchList()
				selected.value = []
				uni.showToast({
					title: '批量改名成功'
				})
			}
		}
	}

	const handleChatRemove = (index) => {
		selected.value.splice(index, 1)
	}

	const hanlePreview = (url) => {
		uni.previewImage({
			urls: [url]
		})
	}

	const loadMore = () => {
		page.value++
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

				.empty {
					padding: 20px;
				}

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

			.empty {
				text-align: center;
				padding: 25px;
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