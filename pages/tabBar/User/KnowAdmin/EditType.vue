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

		<button type="primary" @click="handleSubmit">保存</button>

		<view class="deleteBar">
			<button type="warn" size="mini" @click="handleDelete">删除此分类</button>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import IconSelect from '@/components/IconSelect.vue'
	import * as knowAdminApi from '@/api/knowAdmin.js'
	import {
		useKaStore
	} from '@/stores/knowAdmin';

	const kaStore = useKaStore()

	const form = ref()

	const values = reactive(kaStore.currentType)

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
		} = await knowAdminApi.update(values)

		if (statusCode === 200) {
			uni.showToast({
				title: '修改成功'
			})

			kaStore.updateCurrentType()

			uni.navigateBack()
		}
	}

	const handleDelete = async () => {
		const {
			confirm
		} = await uni.showModal({
			title: '确认删除吗？',
		})

		if (!confirm) return

		const {
			statusCode
		} = await knowAdminApi.remove(values.id)

		if (statusCode === 200) {
			uni.showToast({
				title: '删除成功'
			})

			kaStore.fetchTypeList()

			uni.navigateBack({
				delta: 2
			})
		}
	}
</script>

<style lang="scss">
	.AddMenu {
		padding: 20px;

		.deleteBar {
			margin-top: 20px;
			text-align: center;
		}
	}
</style>