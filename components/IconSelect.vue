<template>
	<view class="IconSelect" @click="handleSelect">
		<image class="image" :src="iconPath(value||'add')"></image>
	</view>

	<uni-drawer ref="drawer" mode="right" class="IconSelect-drawer" :width="300">
		<view class="IconSelect-drawer-content">
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
	import iconPath from '@/utils/iconPath';

	const drawer = ref()

	const value = defineModel()

	const handleSelect = () => {
		drawer.value.open()
	}

	const icons = ref(['add', 'admin', 'logo', 'logout', 'my', 'study', 'studyImage', 'tuku', 'apple', 'banana',
		'cabbage1', 'carrot', 'grape', 'hamigua', 'horse', 'liulian', 'niu', 'pangxie', 'pear', 'watermelon'
	])

	const gridList = computed(() => icons.value.map(item => {
		return {
			name: item,
			imgSrc: iconPath(item)
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