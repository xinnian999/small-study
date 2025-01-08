<template>
	<view class="knowDetail">
		<swiper class="swiper" circular indicator-dots :interval="5000" :duration="500" :current="index">
			<swiper-item v-for="item in list" :key="item.url" class="swiper-item">
				<image :src="item.url" />
			</swiper-item>
		</swiper>

		<view class="info">
			<view class="info-item" v-for="item in infoConfig" :key="item.label">
				<text>{{item.label}}</text> <text>{{item.render(info)}}</text>
			</view>
		</view>

		<view class="actions">
			<button v-for="item in actionConfig" :key="item.name" :type="item.type"
				@click="item.onClick">{{item.name}}</button>
		</view>
	</view>
</template>

<script>
	import * as knowApi from '@/api/know.js'

	export default {
		data() {
			return {
				list: [],
				typeId: null,
				index: 0,
				infoConfig: [{
					label: '学习次数',
					render: (data) => data.count + '次'
				}, {
					label: '正确',
					render: (data) => data.correct + '次'
				}, {
					label: '错误',
					render: (data) => data.error + '次'
				}, {
					label: '正确率',
					render: (data) => data.correctRate * 100 + '%'
				}],
				actionConfig: [{
					name: '正确',
					type: 'primary',
					onClick: async () => {
						const {
							id
						} = this.info
						await knowApi.addCorrect({
							id
						})

						this.fetchList()
					}
				}, {
					name: '跳过',
					onClick: this.handleNext
				}, {
					name: '错误',
					type: 'warn',
					onClick: async () => {
						const {
							id
						} = this.info
						await knowApi.addError({
							id
						})

						this.fetchList()
					}
				}]
			}
		},
		computed: {
			info() {
				return this.list[this.index] || {}
			}
		},
		methods: {
			async fetchList() {
				const {
					statusCode,
					data
				} = await knowApi.list({
					typeId: this.typeId
				})

				if (statusCode === 200) {
					this.list = data
				}
			},
			handleNext() {
				if (this.index === this.list.length - 1) {
					this.index = 0
				} else {
					this.index++
				}
			}
		},
		onLoad({
			typeId
		}) {
			this.typeId = typeId
			this.fetchList()
		},

	}
</script>

<style lang="scss">
	.knowDetail {
		height: 100%;
		background-color: #fff;
		padding: 15px;

		.swiper {
			height: 600rpx;
			margin-bottom: 20px;
			border: 2px solid #eee;
			border-radius: 10px;
			overflow: hidden;

			.swiper-item {
				height: 100%;

				image {
					display: block;
					width: 100%;
					height: 100%;
				}

			}
		}



		.info {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 15px;
			margin-bottom: 30px;

			.info-item {
				width: 100%;
				display: flex;
				justify-content: space-between;
				color: #666;
				border-bottom: 1px solid #eee;
				padding-bottom: 5px;
			}
		}

		.actions {
			display: flex;
			gap: 15px;
		}
	}
</style>