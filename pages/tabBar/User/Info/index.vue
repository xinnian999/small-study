<template>
	<view>
		<uni-list>
			<uni-list-item v-for="{label,value,onClick,avatar,showArrow} in list" :key="label" :showArrow="showArrow"
				:title="label" :right-text="value" @click="onClick" clickable>
				<template v-slot:body>
					<text class="slot-text">{{label}}</text>
				</template>
				<template v-if="avatar" v-slot:footer>
					<image class="slot-image" :src="value" mode="widthFix"></image>
				</template>
			</uni-list-item>

		</uni-list>
	</view>
</template>

<script setup>
	import {
		computed,
		onMounted,
		ref
	} from 'vue'
	import * as authApi from '@/api/auth.js'
	import {
		useGlobalStore
	} from '@/stores/global';

	const {
		userInfo,
		setUserInfo
	} = useGlobalStore()

	onMounted(async () => {
		authApi.getUserInfo().then(({
			statusCode,
			data
		}) => {
			if (statusCode === 200) {
				setUserInfo(data)
			}
		})
	})

	const list = computed(() => {
		return [{
				label: '头像',
				value: userInfo.avatar,
				avatar: true,
				showArrow: true,
				onClick: () => {

				}
			},
			{
				label: '昵称',
				value: userInfo.nickname,
				showArrow: true,
				onClick: () => {
					uni.navigateTo({
						url: 'NickName'
					})
				}
			},
			{
				label: '用户名',
				value: userInfo.username,
				showArrow: false,
				onClick: () => {

				}
			}
		]
	})
</script>

<style>
	body {
		background-color: #eee;
	}

	.slot-text {
		flex: 1;
		font-size: 14px;
		margin-right: 10px;
		display: flex;
		align-items: center;
	}

	.slot-image {
		display: block;
		margin-right: 10px;
		width: 40px;
		height: 40px;
	}
</style>