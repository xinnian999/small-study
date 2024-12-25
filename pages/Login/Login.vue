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

	<uni-popup ref="message" type="message">
		<uni-popup-message type="success" message="登陆成功,即将进入..." :duration="2000" />
	</uni-popup>

	<uni-popup ref="errorDialog" type="dialog">
		<uni-popup-dialog type="success" :showClose="false" title="登陆失败" content="用户名或密码错误,请重新输入"></uni-popup-dialog>
	</uni-popup>

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

	const {
		setUserInfo
	} = useGlobalStore()

	const message = ref()
	const errorDialog = ref()

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

			const {
				data: userInfo
			} = await authApi.getUserInfo()

			// uni.setStorageSync('user_info', userInfo)
			setUserInfo(userInfo)

			message.value.open()

			setTimeout(() => {
				uni.switchTab({
					url: '/pages/tabBar/Home/index'
				})
			}, 2000)
		}

		if (statusCode === 401) {
			errorDialog.value.open()
		}
	}


	onMounted(() => {
		uni.setBackgroundColor({
			backgroundColor: 'aqua'
		})
	})
</script>

<style scoped lang="scss">
	body {
		background-image: linear-gradient(to bottom, #FF5F6D, #FFC371);
	}

	.login-page {
		padding: 0 20px;

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