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

			<uni-forms-item name="verify">
				<button type="default" :disabled="!!values.verify"
					@click="handleVerify">{{values.verify?'已完成验证': '点击进行人机验证'}}</button>
				<zmm-slider-verify ref="sliderVerify" showBottomSlider @success="successHandle" />
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
	import * as authApi from '@/api/auth.js'

	const form = ref()
	const sliderVerify = ref()

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
		verify: {
			rules: [{
				required: true,
				errorMessage: '请完成人机验证',
			}]
		},
	}

	const values = reactive({
		username: '',
		password: '',
		confimPassword: '',
		verify: ''
	})

	const handleOk = async () => {
		await form.value.validate()

		const {
			statusCode
		} = await authApi.register({
			username: values.username,
			password: values.confimPassword
		})


		if (statusCode === 200) {
			alertDialog.value.open()
		}

		if (statusCode === 409) {
			errorDialog.value.open()
		}

	}

	const goLogin = () => {
		uni.navigateTo({ 
			url: '/pages/Login/Login'
		})
	}

	//显示验证组件
	const handleVerify = () => {
		sliderVerify.value.show()
	}
	//验证通过回调
	const successHandle = (e) => {
		values.verify = e
	}
</script>

<style lang="scss">
	.login-page {
		padding: 20px;
		height: 100%;
		background-image: linear-gradient(to bottom, #00a7fe, #91cc75);

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