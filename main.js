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

		// const {
		// 	data
		// } = await uni.getStorage({
		// 	key: 'auth_token'
		// })

		// if (data) {
		// 	console.log(args)
		// 	args.header = {
		// 		authorization: data
		// 	}
		// }
	},
	success(args) {
		// 请求成功后，修改code值为1
		// args.data.code = 1
	},
	fail(err) {
		console.log('interceptor-fail', err)
	},
	complete(res) {
		console.log('interceptor-complete', res)
	}
})