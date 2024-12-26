<template>
	<view class="nickname">
		<uni-easyinput v-model="value" placeholder="请输入昵称"></uni-easyinput>
		<button type="primary" class="save" @click="handleSave">保存</button>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import * as api from "@/api/auth";
	import {
		useGlobalStore
	} from '@/stores/global';

	const globalStore = useGlobalStore()

	const value = ref(globalStore.userInfo.nickname)

	const handleSave = async () => {
		const {
			statusCode
		} = await api.setUserInfo({
			nickname: value.value
		})

		if (statusCode === 200) {
			globalStore.updateUserInfo()

			uni.navigateBack()
		}
	}
</script>

<style scoped lang="scss">
	body {
		background-color: #eee;
	}

	.nickname {
		padding: 10px;

		.save {
			margin-top: 20px;
		}
	}
</style>