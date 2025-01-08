<template>
	<view class="topbar">
		<view>
			请选择一个分类进入
		</view>

	</view>

	<view class="KnowAdmin-menus">
		<uni-list v-if="list.length">
			<uni-list-item v-for="item in list" :key="item.name" :title="item.name" :note="item.desc" showArrow
				:thumb="iconPath(item.icon)" thumb-size="base" rightText="1" clickable @click="goDetail(item)" />
		</uni-list>

		<kevy-empty v-else :show="true" type="list" text="你还没有配置过识图分类"></kevy-empty>
	</view>

</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import * as knowApi from '@/api/know.js'
	import iconPath from '@/utils/iconPath';

	const list = ref([])


	const goDetail = (data) => {
		uni.navigateTo({
			url: `/pages/tabBar/Home/knowDetail?typeId=${data.id}`
		})
	}

	onMounted(async () => {
		const {
			statusCode,
			data
		} = await knowApi.typeList()

		if (statusCode === 200) {
			list.value = data
		}
	})
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