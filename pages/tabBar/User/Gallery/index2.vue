<template>
	<view class="Gallery">
		<l-tabs v-model="type" :list="typeConfig" :space-evenly="false" />

		<view class="action1">
			<button type="primary" size="mini" @click="upload">上传{{typeLabel}}图片</button>
			<button type="primary" size="mini" @click="isEdit=!isEdit">{{isEdit?'取消批量操作':'批量操作'}}</button>
		</view>

		<view class="action2" v-if="isEdit">
			<label @click="isCheckedAll=!isCheckedAll">
				<radio :checked="isCheckedAll" />全选
			</label>

			<view class="batchBtn">
				<button class="mini-btn" type="default" size="mini">批量移动</button>
				<button class="mini-btn" type="warn" size="mini" @click="handleBatchDelete">批量删除</button>
			</view>
		</view>

		<l-loading v-if="loading" class="loading" />

		<view v-else-if="list.length" class="list">
			<view class="item" :key="item.url" v-for="item in list">
				<radio v-if="isEdit" class="radio" :checked="selected.includes(item.id)"
					@click="handleSelect(item.id)" />
				<image class="img" :src="item.url" />
			</view>
		</view>
		<kevy-empty v-else :show="true" type="list" text="无数据" class="list-empty"></kevy-empty>
	</view>
</template>
<script setup>
	import {
		onMounted,
		ref,
		watch,
		computed
	} from 'vue';
	import * as galleryApi from '@/api/gallery.js';
	import * as uploadApi from '@/api/upload.js'
	import typeConfig from '@/utils/galleryType.js'

	const list = ref([])

	const selected = ref([])

	const isEdit = ref(false)

	const isCheckedAll = ref(false)

	const loading = ref(false)

	const type = ref('plant')

	const typeLabel = computed(() => typeConfig.find(item => item.value === type.value)?.label)

	const fetchList = async () => {
		loading.value = true
		const {
			statusCode,
			data
		} = await galleryApi.list({
			type: type.value
		})
		list.value = data
		loading.value = false
	}
	const upload = () => {
		uni.chooseImage({
			success: async (chooseImageRes) => {
				const files = chooseImageRes.tempFiles.map(file => ({
					name: 'file',
					file,
					uri: file.path
				}));
				await uploadApi.gallery(files, {
					type: type.value
				})
				fetchList()
			}
		})
	}

	const handleSelect = (id) => {
		if (selected.value.includes(id)) {
			selected.value = selected.value.filter(item => item !== id)
		} else {
			selected.value.push(id)
		}
	}

	const handleBatchDelete = async () => {
		const {
			statusCode
		} = await galleryApi.deleteGallery({
			ids: selected.value
		})

		if (statusCode === 201) {
			uni.showToast({
				title: '删除成功'
			})

			isEdit.value = false

			fetchList()
		}
	}

	onMounted(fetchList)


	watch(type, () => {
		fetchList()
	})

	watch(isCheckedAll, (newVal) => {
		if (newVal) {
			selected.value = list.value.map(item => item.id)
		} else {
			selected.value = []
		}
	})

	watch(isEdit, newVal => {
		if (!newVal) {
			isCheckedAll.value = false
		}
	})
</script>
<style lang="scss">
	.Gallery {
		padding: 10px;
		display: flex;
		flex-direction: column;
		gap: 15px;
		position: relative;
	}

	.loading {
		width: 30px;
		margin: 0 auto;
		margin-top: 50px;
	}

	.action1 {
		display: flex;
		justify-content: space-between;

		uni-button {
			margin: 0;
		}
	}

	.action2 {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.batchBtn {
			display: flex;
			gap: 10px;
		}
	}

	.list {
		height: 100%;
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 10px;

		.item {
			height: 150px;
			position: relative;

			.radio {
				position: absolute;
				right: 5px;
				bottom: 5px;
				z-index: 10;
			}

			.img {
				width: 100%;
				height: 100%;
				border: 1px solid #eee;
				border-radius: 6px;
			}
		}
	}
</style>