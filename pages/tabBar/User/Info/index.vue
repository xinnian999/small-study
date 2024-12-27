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
	import * as uploadApi from '@/api/upload.js'
	import {
		useGlobalStore
	} from '@/stores/global';

	const globalStore = useGlobalStore()


	const list = computed(() => {
		const {
			userInfo
		} = globalStore

		return [{
				label: '头像',
				value: userInfo.avatar,
				avatar: true,
				showArrow: true,
				onClick: () => {
					uni.chooseImage({
						success: async (chooseImageRes) => {
							const files = chooseImageRes.tempFiles;

							const {
								statusCode
							} = await uploadApi.userAvatar(files[0])

							if (statusCode === 201) {
								uni.showToast({
									title: '更新成功'
								})

								globalStore.updateUserInfo()
							}

						}
					})
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