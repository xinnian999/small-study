<template>
	<view>
		<uni-grid :column="4" :highlight="true" @change="change">
			<uni-grid-item v-for="(item, index) in menus" :index="index" :key="index">
				<view class="grid-item-box" style="background-color: #fff;" @click="goPath(item.path)">
					<uni-icons :type="item.icon||'image'" :size="30" color="#777" />
					<text class="text">{{item.label}}</text>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script setup>
	const menus = [{
			label: '图库',
			icon: 'images',
			path: '/pages/tabBar/Admin/ImageLibrary/index'
		}, {
			label: '识图管理',
			icon: 'image',
			path: '/pages/tabBar/Admin/KnowAdmin/KnowAdmin'
		},

		{
			label: 'xx管理',
			path: ''
		},
		{
			label: 'xx管理',
			path: ''
		}
	]

	const goPath = (path) => {
		uni.navigateTo({
			url: path
		})
	}
</script>

<style lang="scss">
	.warp {
		padding: 10px;
	}

	.button {
		margin-bottom: 10px;
	}

	.image {
		width: 25px;
		height: 25px;
	}

	.text {
		font-size: 14px;
		margin-top: 5px;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		// display: block;
		/* #endif */
	}

	.grid-dynamic-box {
		margin-bottom: 15px;
	}

	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.grid-item-box-row {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}

	.swiper {
		height: 420px;
	}
</style>