<template>
	<view class="topbar">
		<view>
			请选择一个分类进入
		</view>

		<button type="primary" size="mini" @click="handleAdd">创建</button>
	</view>

	<view class="KnowAdmin-menus">
		<uni-list v-if="kaStore.typeList.length">
			<uni-list-item v-for="item in kaStore.typeList" :key="item.name" :title="item.name" :note="item.desc"
				showArrow :thumb="iconPath(item.icon)" thumb-size="base" rightText="1" clickable
				@click="goAdmin(item)" />
		</uni-list>

		<kevy-empty v-else :show="true" type="list" text="还没有分类, 创建一个吧"></kevy-empty>
	</view>

</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import * as knowAdminApi from '@/api/knowAdmin.js'
	import iconPath from '@/utils/iconPath';
	import {
		useKaStore
	} from '@/stores/knowAdmin';


	const kaStore = useKaStore()

	const popup = ref()

	const handleAdd = () => {
		uni.navigateTo({
			url: 'AddType'
		})
	}


	const goAdmin = (data) => {
		kaStore.setCurrentType(data)
		uni.navigateTo({
			url: 'Detail',
		})
	}


	onMounted(kaStore.fetchTypeList)
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