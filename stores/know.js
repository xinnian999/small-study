import {
	defineStore
} from "pinia";
import * as knowAdminApi from '@/api/knowAdmin.js'

export const useKnowStore = defineStore("ka", {
	state: () => {
		return {
			typeList: []
		};
	},
	actions: {
		async fetchTypeList() {
			const {
				statusCode,
				data
			} = await knowAdminApi.list()

			if (statusCode === 200) {
				this.typeList = data
			}
		},
	},
	unistorage: true
});