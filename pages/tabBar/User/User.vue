<template>
	<view class="user">
		<view class="userBar" @click="goInfo">
			<view class="avatar">
				<image class="img" :src="userInfo.avatar" />
			</view>
			<view class="names">
				<view class="nickname">
					{{userInfo.nickname}}
				</view>
				<view class="username">
					{{userInfo.username}}
				</view>
			</view>

			<uni-icons type="right" size="16" class="ico" color="rgb(187, 187, 187)"></uni-icons>
		</view>

		<uni-list class="list">
			<uni-list-item showArrow title="图库" />
			<uni-list-item showArrow title="识图管理" />
		</uni-list>
	</view>
</template>

<script setup>
	import {
		useGlobalStore
	} from '@/stores/global';

	const {
		userInfo
	} = useGlobalStore()

	const goInfo = () => {
		uni.navigateTo({
			url: 'Info/index'
		})
	}
</script>

<style scoped lang="scss">
	body {
		background-color: #eee;
	}

	.user {

		.userBar {
			display: flex;
			padding: 15px 20px;
			position: relative;
			background-color: #fff;

			.avatar {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				overflow: hidden;

				.img {
					height: 100%;
					width: 100%;
				}
			}

			.names {
				margin-left: 15px;

				.nickname {
					font-size: 18px
				}

				.username {
					color: #999;
				}
			}

			.ico {
				position: absolute;
				right: 10px;
				color: #999;
				top: 50%;
				transform: translateY(-50%);
			}
		}

		.list {
			margin-top: 20px;
		}
	}
</style>