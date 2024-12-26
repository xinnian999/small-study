import {
	defineStore
} from "pinia";
import {
	uniqBy
} from "lodash";
import * as authApi from '@/api/auth.js'

export const useGlobalStore = defineStore("global", {
	state: () => {
		return {
			userInfo: {
				username: '用户名',
				nickname: '昵称',
			}
		};
	},
	actions: {
		setUserInfo(data) {
			this.userInfo = data;
		},
		updateUserInfo() {
			authApi.getUserInfo().then(({
				statusCode,
				data
			}) => {
				if (statusCode === 200) {
					this.userInfo = data;
				}
			})
		}
	},
	unistorage: {
		paths: ["userInfo"],
	},
});