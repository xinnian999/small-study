<template>
	<view class="login-page">
		<view class="logo">
			小学习通
		</view>

		<uni-forms ref="form" :modelValue="values" class="form" :rules="rules">
			<uni-forms-item name="username">
				<uni-easyinput v-model="values.username" placeholder="请输入用户名" />
			</uni-forms-item>
			<uni-forms-item name="password">
				<uni-easyinput v-model="values.password" type="password" placeholder="请输入密码" />
			</uni-forms-item>
		</uni-forms>

		<view class="actions">
			<button type="primary" @click="handleLogin">登陆</button>
		</view>

		<view class="footer">
			<view @click="goRegister">
				注册新账号
			</view>
		</view>

	</view>

</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import * as authApi from '@/api/auth.js'
	import {
		useGlobalStore
	} from '@/stores/global.js';

	const globalStore = useGlobalStore()

	const form = ref()

	const values = reactive({
		username: '',
		password: ''
	})

	const rules = {
		// 对name字段进行必填验证
		username: {
			rules: [{
				required: true,
				errorMessage: '请输入用户名',
			}]
		},
		password: {
			rules: [{
				required: true,
				errorMessage: '请输入密码',
			}]
		}
	}


	const goRegister = () => {
		uni.navigateTo({
			url: 'Register'
		})
	}

	const handleLogin = async () => {
		await form.value.validate()
		const {
			statusCode,
			data
		} = await authApi.login(values)

		if (statusCode === 200) {
			const token = data.access_token
			uni.setStorageSync('auth_token', token)

			globalStore.updateUserInfo()

			// message.value.open()

			uni.showToast({
				title: '登陆成功'
			})

			setTimeout(() => {
				uni.switchTab({
					url: '/pages/tabBar/Home/index'
				})
			}, 1000)
		}

		if (statusCode === 401) {
			uni.showToast({
				title: '密码错误',
				icon:'error'
			})
		}
	}

	onMounted(() => {
		const token = uni.getStorageSync('auth_token')

		if (token) {
			uni.switchTab({
				url: '/pages/tabBar/Home/index'
			})
		}
	})
</script>

<style lang="scss">
	.login-page {
		padding: 0 20px;
		box-sizing: border-box;
		width: 100vw;
		height: 100vh;
		background-image: linear-gradient(to bottom, #FF5F6D, #FFC371);
		position: absolute;
		top: 0;
		left: 0;

		.logo {
			text-align: center;
			font-size: 40px;
			color: #fff;
			text-shadow: 0 0 5px #FF0200, 0 0 10px #727272;
			text-align: center;
			margin: 30rpx auto;
			margin-top: 20%;
			font-style: italic;
		}

		.form {
			margin-top: 50px;
		}

		.actions {
			text-align: center;
		}

		.footer {
			font-size: 12px;
			color: blue;
			position: absolute;
			bottom: 100px;
			z-index: 999;
			left: 0px;
			text-align: center;
			width: 100%;
		}
	}
</style>