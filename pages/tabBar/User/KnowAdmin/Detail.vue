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
			<!-- <button @click="handleAdd" size="mini" type="primary">添加图片</button> -->
		</view>

		<kevy-empty :show="true" type="list" text="还没有图片, 创建一个吧"></kevy-empty>
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
	import * as knowTypeApi from '@/api/knowType.js'
	import iconPath from "@/utils/iconPath"
	import {
		useKaStore
	} from "./store"

	const kaStore = useKaStore()

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
		uni.navigateTo({
			url: '/pages/tabBar/User/KnowAdmin/GallerySelect'
		})
	}

	onMounted(() => {
		uni.setNavigationBarTitle({
			title: `识图管理-${info.value.name}`
		});
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
</style>