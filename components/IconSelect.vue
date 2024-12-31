<template>
	<view class="IconSelect" @click="handleSelect">
		<image class="image" :src="`/static/icons/${value||'add'}.png`"></image>
	</view>

	<uni-drawer ref="drawer" mode="right" class="IconSelect-drawer" :width="300">
		<view class="IconSelect-drawer-content">
			<!-- <view class="title">
				请选择一个图标
			</view> -->
			<cc-gonggeGrid gridTitle="请选择一个图标" gridNum="3" :gridList="gridList" @gridClick="gridClick"></cc-gonggeGrid>
		</view>

	</uni-drawer>
</template>

<script setup>
	import {
		computed,
		onMounted,
		ref
	} from 'vue';

	const drawer = ref()

	const value = defineModel()

	const handleSelect = () => {
		drawer.value.open()
	}

	const icons = ref(['add', 'admin', 'logo', 'logout', 'my', 'study', 'studyImage', 'tuku'])

	const gridList = computed(() => icons.value.map(item => {
		return {
			name: item,
			imgSrc: `/static/icons/${item}.png`
		}
	}))

	const gridClick = ({
		name
	}) => {
		value.value = name
		drawer.value.close()
	}
</script>

<style lang="scss">
	.IconSelect {
		height: 100px;
		width: 100px;
		border: 1px solid rgb(229, 229, 229);
		display: flex;
		border-radius: 5px;
		background-color: #fff;

		.image {
			height: 60px;
			width: 60px;
			margin: auto;
		}
	}

	.IconSelect-drawer {

		.IconSelect-drawer-content {
			padding: 10px;

			.title {
				font-size: 18px;
				padding: 10px;
			}
		}

	}
</style>