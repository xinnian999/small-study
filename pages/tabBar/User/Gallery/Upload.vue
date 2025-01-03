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
				<uni-file-picker limit="20" title="最多选择20张图片"></uni-file-picker>
			</uni-forms-item>
		</uni-forms>

		<button type="primary">上传</button>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';

	const values = reactive({
		type: '',
		title: ''
	})

	const options = []
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