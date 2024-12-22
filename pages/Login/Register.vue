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
			<uni-forms-item name="confimPassword">
				<uni-easyinput v-model="values.confimPassword" type="password" placeholder="请再次输入密码" />
			</uni-forms-item>
		</uni-forms>

		<view class="actions">
			<button type="primary" @click="handleOk">立即注册</button>
		</view>

		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="success" cancelText="关闭" confirmText="前往登陆" title="通知" content="注册成功"
				@confirm="goLogin"></uni-popup-dialog>
		</uni-popup>

		<uni-popup ref="errorDialog" type="dialog">
			<uni-popup-dialog type="success" :showClose="false" title="通知" content="用户名已存在,请重新输入"></uni-popup-dialog>
		</uni-popup>
	</view>

</template>

<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from 'vue';
	import * as loginApi from '@/api/login.js'

	const form = ref()

	const alertDialog = ref()
	const errorDialog = ref()

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
				},
				{
					minLength: 8,
					errorMessage: '密码不能少于{minLength}个字符',
				}
			]
		},
		confimPassword: {
			rules: [{
					required: true,
					errorMessage: '请再次输入密码',
				},
				{
					validateFunction: (rule, value, data, callback) => {
						if (value === values.password) {
							return true
						} else {
							callback('两次密码输入不一致')
							return false
						}
					}
				}
			]
		},
	}

	const values = reactive({
		username: '',
		password: '',
		confimPassword: ''
	})

	const handleOk = async () => {
		await form.value.validate()

		const res = await loginApi.register({
			username: values.username,
			password: values.confimPassword
		})


		if (res.data.errno === 0) {
			alertDialog.value.open()
		}

		if (res.data.errno === 1062) {
			errorDialog.value.open()
		}

	}

	const goLogin = () => {
		uni.navigateTo({
			url: '/pages/Login/Login'
		})
	}

	onMounted(() => {
		uni.setBackgroundColor({
			backgroundColor: 'aqua'
		})
	})
</script>

<style scoped lang="scss">
	body {
		background-color: #eee;
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