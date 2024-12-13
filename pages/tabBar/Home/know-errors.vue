<template>
	<uni-section title="这是什么？" type="line">
		<uni-card>
			<template v-if="store.errors.length">
				<image slot='cover' style="width: 100%;" :src="current.img"></image>
				<!-- <text class="uni-body">这是一个带封面和操作栏的卡片示例，此示例展示了封面插槽和操作栏插槽的用法。</text> -->
				<view slot="actions" class="card-actions">
					<view class="card-actions-item" @click="handleYes">
						<icon type="success" size="40" />
					</view>
					<view class="card-actions-item" @click="handleError">
						<icon type="clear" size="40" />
					</view>
				</view>
			</template>
			<div v-else>暂时没有错题啦～</div>
		</uni-card>
	</uni-section>

	<uni-pagination v-if="store.errors.length" v-model="index" :current="index" class="pagination"
		:total="store.errors.length" page-size="1" prev-text="上一个" next-text="下一个" />
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

	const index = ref(1)

	const current = computed(() => store.errors[index.value - 1])

	const handleYes = () => {
		const r = store.errors.filter(item => item.id !== current.value.id)
		store.setErrors(r)
		index.value === store.errors.length - 1
	}

	const handleError = () => {
		if (index.value < store.errors.length) {
			index.value++
		}
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