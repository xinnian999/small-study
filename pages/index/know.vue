<template>
	<uni-section title="这是什么？" type="line">
		<uni-card :cover="cover">
			<image slot='cover' style="width: 100%;" :src="store.current.img"></image>
			<!-- <text class="uni-body">这是一个带封面和操作栏的卡片示例，此示例展示了封面插槽和操作栏插槽的用法。</text> -->
			<view slot="actions" class="card-actions">
				<view class="card-actions-item" @click="store.handleYes">
					<icon type="success" size="40" />
				</view>
				<view class="card-actions-item" @click="handleError">
					<icon type="clear" size="40" />
				</view>
			</view>
		</uni-card>
	</uni-section>
	<view class="infoBar" v-if="store.current.yes||store.current.no">
		<view class="label">已刷次数：</view> {{store.total}}
	</view>
	<view class="infoBar" v-if="store.current.yes||store.current.no">
		<view class="label">正确率：</view> {{store.accuracy}}
	</view>

	<uni-pagination v-model="store.index" :current="store.index" class="pagination" :total="store.dataSource.length"
		page-size="1" prev-text="上一个" next-text="下一个" />
</template>

<script setup>
	import {
		computed,
		ref
	} from 'vue';
	import {
		useKnowStore
	} from '@/stores/know.js'

	const store = useKnowStore()
	
	const handleError=()=>{
		store.handleNo()
		// dialogToggle('已加入错题集')
	}
</script>

<style lang="scss" scoped>
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
	}

	.card-actions-item {
		display: flex;
		flex-direction: row;
		align-items: center;
	}


	.infoBar {

		.label {
			width: 50%;
			text-align: right;
			display: inline-block;
		}
	}



	.pagination {
		padding: 20px;
	}
</style>