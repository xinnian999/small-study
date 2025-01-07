<template>

	<view class="typeDetail">
		<uni-list-item style="margin-bottom: 20px;" :title="info.name" :note="info.desc" :thumb="iconPath(info.icon)"
			thumb-size="base" clickable>
			<template v-slot:footer>
				<view class="editBtn">
					<button @click="goEdit" size="mini" type="primary">编辑</button>
				</view>
			</template>
		</uni-list-item>

		<view class="actions">
			<button @click="handleAdd" size="mini" type="primary">添加图片</button>
		</view>

		<view v-if="kaStore.imageList.length">
			<uni-card v-for="item in kaStore.imageList" :cover="item.url" :key="item.url">

				<view slot="actions" class="card-actions">

					<button size="mini" @click="handleDelete(item)">重置数据</button>
					<button size="mini" type="warn" @click="handleDelete(item)">删除</button>

				</view>
			</uni-card>
		</view>


		<kevy-empty v-else :show="true" type="list" text="还没有图片, 添加一些吧"></kevy-empty>
	</view>

	<uni-popup ref="popup" type="bottom" border-radius="10px 10px 0 0">
		<view class="addImage">
			<button type="primary">从相册上传</button>
			<button @click="goGallery">从图库选取</button>
		</view>
	</uni-popup>
</template>

<script setup>
	import {
		ref,
		reactive,
		toRefs,
		onMounted
	} from "vue"
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import * as knowAdminApi from '@/api/knowAdmin.js'
	import iconPath from "@/utils/iconPath"
	import {
		useKaStore
	} from '@/stores/knowAdmin';
	import {
		useGalleryStore
	} from "@/stores/gallery.js"
	import * as knowApi from "@/api/know";

	const kaStore = useKaStore()

	const galleryStore = useGalleryStore()

	const popup = ref()

	const {
		currentType: info
	} = toRefs(kaStore)

	const goEdit = () => {
		uni.navigateTo({
			url: '/pages/tabBar/User/KnowAdmin/EditType',
		})
	}

	const handleAdd = () => {
		popup.value.open()
	}

	const goGallery = () => {
		popup.value.close()

		galleryStore.setReadonly(true)

		uni.navigateTo({
			url: '/pages/tabBar/User/Gallery/List'
		})
	}

	const handleDelete = async (item) => {
		const {
			statusCode
		} = await knowApi.remove(item.id)

		if(statusCode===200){
			uni.showToast({
				title:'删除成功'
			})
			kaStore.fetchImageList()
		}

	}

	onMounted(() => {
		uni.setNavigationBarTitle({
			title: `识图管理-${info.value.name}`
		});

		kaStore.fetchImageList()
	})
</script>

<style lang="scss">
	.typeDetail {
		padding: 20px;

		.editBtn {
			display: flex;
			align-items: center;
		}

		.actions {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20px;

			button {
				margin: 0;
			}
		}
	}

	.addImage {
		height: 100px;
		background-color: #fff;
		padding: 20px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		button {
			margin: 0;
		}
	}

	.card-actions {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 45px;
		border-top: 1px #eee solid;
	}

	.card-actions-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.card-actions-item-text {
		font-size: 12px;
		color: #666;
		margin-left: 5px;
	}
</style>