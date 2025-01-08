<template>
	<view class="home">
		<view class="menus">
			<view class="item" v-for="item in menus" @click="go(item)">
				<image class="ico" :src="iconPath(item.icon)" />

				<view class="label">
					{{item.label}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import iconPath from '@/utils/iconPath';

	const menus = [{
			label: '识图启蒙',
			icon: 'studyImage',
			to: '/pages/tabBar/Home/know'
		},
		{
			label: '汉字王国',
			icon: 'chinese',
			to: ''
		},
		{
			label: '数学天地',
			icon: 'math',
			to: ''
		},
		{
			label: '艺术创意',
			icon: 'art',
			to: ''
		},
		{
			label: '阅读星球',
			icon: 'read',
			to: ''
		},
		{
			label: '音乐世界',
			icon: 'music',
			to: ''
		},
	]


	const go = ({
		to
	}) => {
		if (to) {
			uni.navigateTo({
				url: to
			})
		}
	}
</script>

<style lang="scss">
	.home {
		padding: 20px;
		background-color: #fff;

		.menus {
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			column-gap: 20px;
			row-gap: 40px;

			.item {
				display: flex;
				flex-direction: column;
				gap: 5px;
				align-items: center;
				color: #666;

				.ico {
					width: 40px;
					height: 40px;
				}
			}
		}
	}
</style>