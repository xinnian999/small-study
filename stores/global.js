import {
	defineStore
} from "pinia";
import {
	uniqBy
} from "lodash";

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
	},
	unistorage: {
		paths: ["userInfo"],
	},
});