import {
	defineStore
} from "pinia";
import * as galleryApi from '@/api/gallery.js';

export const useGalleryStore = defineStore("gallery", {
	state: () => {
		return {
			list: [],
			readonly: false
		};
	},
	actions: {
		async fetchList() {
			const {
				statusCode,
				data
			} = await galleryApi.list()

			if (statusCode === 200) {
				this.list = data
			}
		},
		setReadonly(val) {
			this.readonly = val
		}
	},
	unistorage: true
});