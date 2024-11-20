<template>
	<uni-section title="这是什么？" type="line">
		<uni-card :cover="cover">
			<image slot='cover' style="width: 100%;" :src="dataSource[index-1].img"></image>
			<!-- <text class="uni-body">这是一个带封面和操作栏的卡片示例，此示例展示了封面插槽和操作栏插槽的用法。</text> -->
			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="handeleOK">
					<icon type="success" size="40" />
				</view>
				<view class="card-actions-item" @click="actionsClick('点赞')">
					<icon type="clear" size="40" />
				</view>

			</view>
		</uni-card>
	</uni-section>
	<uni-pagination v-model="index" :current="index" class="pagination" :total="dataSource.length" page-size="1"
		prev-text="上一个" next-text="下一个" />
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const dataSource = [{
			img: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg'
		},
		{
			img: 'https://img1.baidu.com/it/u=1734482911,583275848&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1372'
		},
		{
			img: 'https://img2.baidu.com/it/u=546282302,1627291091&fm=253&fmt=auto&app=120&f=JPEG?w=1228&h=800'
		}
	]

	const index = ref(1)

	const handeleOK = () => {
		if (index.value < dataSource.length) {
			index.value++
		}
	}
</script>

<style lang="scss">
	.container {
		overflow: hidden;
	}

	.custom-cover {
		flex: 1;
		flex-direction: row;
		position: relative;
	}

	.cover-content {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 40px;
		background-color: rgba($color: #000000, $alpha: 0.4);
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 15px;
		font-size: 14px;
		color: #fff;
	}

	.card-actions {
		display: flex;

		uni-icon {
			display: flex;
			align-items: center;
		}

		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 45px;
		// border-top: 1px #eee solid;
	}

	.card-actions-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.card-actions-item-text {
		font-size: 12px;
		color: #666;
		margin-left: 5px;
	}

	.cover-image {
		flex: 1;
		height: 150px;
	}

	.no-border {
		border-width: 0;
	}

	.pagination {
		padding: 20px;
	}
</style>