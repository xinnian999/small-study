import {
	defineStore
} from "pinia";
import * as knowAdminApi from '@/api/knowAdmin.js'

export const useKaStore = defineStore("ka", {
	state: () => {
		return {
			typeList: [],
			currentType: null,
			imageList: []
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
		setCurrentType(data) {
			this.currentType = data
		},
		async updateCurrentType() {
			const {
				statusCode,
				data
			} = await knowAdminApi.detail(this.currentType.id)

			if (statusCode === 200) {
				this.currentType = data
			}
		},
		async fetchImageList() {
			const {
				statusCode,
				data
			} = await knowAdminApi.imageList({
				typeId: this.currentType.id
			})

			if (statusCode === 200) {
				this.imageList = data
			}
		},
	},
	unistorage: true
});