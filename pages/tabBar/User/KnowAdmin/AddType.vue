<template>
	<view class="AddMenu">
		<uni-forms ref="form" :modelValue="values" class="form" :rules="rules" label-position="top">
			<uni-forms-item name="name" label="分类名称">
				<uni-easyinput v-model="values.name" placeholder="请输入分类名称" />
			</uni-forms-item>
			<uni-forms-item name="desc" label="描述">
				<uni-easyinput v-model="values.desc" type="textarea" placeholder="请输入描述" />
			</uni-forms-item>
			<uni-forms-item name="icon" label="图标">
				<IconSelect v-model="values.icon" />
			</uni-forms-item>
		</uni-forms>

		<button type="primary" @click="handleSubmit">创建</button>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref
	} from 'vue';
	import IconSelect from '@/components/IconSelect.vue'
	import * as knowTypeApi from '@/api/knowType.js'
	import {
		useKaStore
	} from "./store"

	const kaStore = useKaStore()
	
	const form = ref()
	
	const values = reactive({
		name: '',
		desc: '',
		icon: ''
	})

	const rules = {
		// 对name字段进行必填验证
		name: {
			rules: [{
				required: true,
				errorMessage: '请输入分类名称',
			}]
		},
		icon: {
			rules: [{
				required: true,
				errorMessage: '请选择一个图标',
			}]
		}
	}

	const handleSubmit = async () => {
		await form.value.validate()

		const {
			statusCode
		} = await knowTypeApi.add(values)

		if (statusCode === 201) {
			uni.showToast({
				title: '创建成功'
			})
			
			kaStore.fetchTypeList()

			uni.navigateBack()
		}
	}
</script>

<style>
	.AddMenu {
		padding: 20px;
	}
</style>