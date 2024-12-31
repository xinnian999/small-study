<template>
	<view class="topbar">
		<view>
			请选择一个分类进入
		</view>

		<button type="primary" size="mini" @click="handleAdd">创建</button>
	</view>

	<view class="KnowAdmin-menus">
		<uni-list>
			<uni-list-item v-for="{name,icon} in list" :key="name" :title="name" note="描述信息" showArrow :thumb="icon"
				thumb-size="base" rightText="1" />
		</uni-list>
	</view>
</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import * as knowTypeApi from '@/api/knowType.js'


	const popup = ref()



	const list = ref([])

	const handleAdd = () => {
		uni.navigateTo({
			url: 'AddMenu'
		})
	}

	const fetchList = async () => {
		const {
			statusCode,
			data
		} = await knowTypeApi.list()
		if (statusCode === 200) {
			list.value = data
		}
	}

	onMounted(fetchList)
</script>

<style lang="scss">
	.topbar {
		padding: 20px;
		padding-bottom: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;

		button {
			margin: 0;
		}
	}

	.KnowAdmin-menus {
		padding: 20px;

		.uni-list {
			gap: 20px;
			background-color: transparent;
		}

		.uni-list-item {
			border-radius: 5px;
		}
	}
</style>