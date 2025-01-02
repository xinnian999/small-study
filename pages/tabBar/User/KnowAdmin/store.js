import {
	defineStore
} from "pinia";
import * as knowTypeApi from '@/api/knowType.js'

export const useKaStore = defineStore("ka", {
	state: () => {
		return {
			typeList: [],
			currentType: null
		};
	},
	actions: {
		async fetchTypeList() {
			const {
				statusCode,
				data
			} = await knowTypeApi.list()

			if (statusCode === 200) {
				this.typeList = data
			}
		},
		setCurrentType(data) {
			this.currentType = data
		},
		async updateCurrentType() {
			const {
				statusCode,
				data
			} = await knowTypeApi.detail(this.currentType.id)

			if (statusCode === 200) {
				this.currentType = data
			}
		}
	},
	unistorage: true
});