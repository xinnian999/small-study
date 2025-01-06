<template>
	<view class="Gallery-Upload">

		<uni-forms ref="form" :modelValue="values" class="form" :rules="rules" label-position="top">
			<uni-forms-item name="type" label="分类">
				<uni-data-select v-model="values.type" :localdata="options"></uni-data-select>
			</uni-forms-item>
			<uni-forms-item name="title" label="图片标题">
				<uni-easyinput v-model="values.title" placeholder="请输入图片标题" />
			</uni-forms-item>
			<uni-forms-item name="images" label="选择图片">
				<uni-file-picker v-model="values.images" limit="20" title="最多选择20张图片"
					@select="onSelect"></uni-file-picker>
			</uni-forms-item>
		</uni-forms>

		<button type="primary" @click="hanleSubmit">上传</button>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import galleryType from '@/utils/galleryType.js';
	import * as galleryApi from '@/api/gallery.js';
	import {
		omit
	} from 'lodash'
	import {
		useGalleryStore
	} from "./store"
	
	const galleryStore = useGalleryStore()

	const form = ref()

	const values = reactive({
		type: 'plant',
		title: '植物',
		images: []
	})

	const options = galleryType.map(item => ({
		text: item.label,
		value: item.value
	}))

	const rules = {
		// 对name字段进行必填验证
		type: {
			rules: [{
				required: true,
				errorMessage: '请选择图片类型',
			}]
		},
		title: {
			rules: [{
				required: true,
				errorMessage: '请输入图片标题',
			}]
		},
		images: {
			rules: [{
				required: true,
				errorMessage: '请上传',
			}]
		}
	}

	const hanleSubmit = async () => {
		await form.value.validate()

		const files = values.images.map(file => ({
			name: 'file',
			file,
			uri: file.path
		}));

		const data = omit(values, ['images'])

		await galleryApi.upload(files, data)

		uni.showToast({
			title: '添加成功'
		})
		
		galleryStore.fetchList()
		
		uni.navigateBack()
	}

	const onSelect = ({
		tempFiles
	}) => {
		values.images = tempFiles
	}
</script>

<style lang="scss">
	.Gallery-Upload {
		padding: 20px;
		background-color: #fff;
		height: 100%;

		.form {
			padding: 10px 0;
			margin: 15px 0;
		}
	}
</style>