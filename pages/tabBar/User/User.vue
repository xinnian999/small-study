<template>
	<view class="user">
		<view class="userBar" @click="goInfo">
			<view class="avatar">
				<image class="img" :src="userInfo.avatar_url" webp />
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

		<uni-list class="list" v-for="{list,key} in listConfig" :key="key">
			<uni-list-item v-for="{title,onClick,icon} in list" :key="title" showArrow :title="title" @click="onClick"
				clickable :thumb="icon" />
		</uni-list>
	</view>
</template>

<script setup>
	import {
		toRefs
	} from 'vue';
	import {
		useGlobalStore
	} from '@/stores/global';
	import {
		useGalleryStore
	} from '@/stores/gallery';
	const galleryStore = useGalleryStore()

	const globalStore = useGlobalStore()

	const {
		userInfo
	} = toRefs(globalStore)

	const goInfo = () => {
		uni.navigateTo({
			url: 'Info/index'
		})
	}

	const handleLogout = () => {
		uni.clearStorageSync('auth_token')
		uni.navigateTo({
			url: '/pages/Login/Login'
		})
	}

	const listConfig = [{
			key: '1',
			list: [{
					title: '图库',
					icon: "/static/tuku.png",
					onClick: () => {
						galleryStore.setReadonly(false)
						uni.navigateTo({
							url: 'Gallery/List'
						})
					}
				},
				{
					title: '识图管理',
					icon: "/static/studyImage.png",
					onClick: () => {
						uni.navigateTo({
							url: 'KnowAdmin/Index'
						})
					}
				}
			]
		},
		{
			key: '2',
			list: [{
				title: '退出登陆',
				icon: "/static/logout.png",
				onClick: () => {
					uni.clearStorageSync('auth_token')
					uni.navigateTo({
						url: '/pages/Login/Login'
					})
				}
			}]
		}
	]


	globalStore.updateUserInfo()
</script>

<style lang="scss">
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