import App from './App'
import {
	createSSRApp
} from 'vue';
import * as Pinia from 'pinia';
import {
	createUnistorage
} from "@/uni_modules/pinia-plugin-unistorage";

export function createApp() {
	const app = createSSRApp(App);
	const store = Pinia.createPinia();

	// 关键代码 👇
	store.use(createUnistorage());

	app.use(store);
	return {
		app,
		Pinia, // 此处必须将 Pinia 返回
	};
}

// const baseURL = 'http://8.141.86.20:3000'
const baseURL = 'http://172.20.72.37:3000'

uni.addInterceptor('request', {
	invoke(args) {
		// request 触发前拼接 url
		args.url = baseURL + args.url
		args.header = {
			test: 1112
		}

		const token = uni.getStorageSync('auth_token')

		if (token) {
			args.header.authorization = `Bearer ${token}`
		}
	},
	success(args) {
		// 请求成功后，修改code值为1
		// args.data.code = 1
	},
	fail(err) {
		// console.log('interceptor-fail', err)
	},
	complete(res) {
		// 获取当前页面的路由地址
		// const pages = getCurrentPages(); // 获取当前页面栈
		// const currentPage = pages[pages.length - 1]; // 获取当前页面实例
		// const path = currentPage.route; // 获取当前页面的路由地址

		if (res.statusCode === 401 && res.data.message !== 'passwordError') {
			uni.navigateTo({
				url: '/pages/Login/Login'
			})
		}
	}
})