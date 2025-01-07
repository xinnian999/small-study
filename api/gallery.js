export const list = (data) => {
	return uni.request({
		url: '/gallery/list',
		method: 'GET',
		data
	})
}

export const upload = (files, data) => {
	return uni.uploadFile({
		url: '/gallery/upload',
		files,
		formData: data,
	})
}

export const rename = (data) => {
	return uni.request({
		url: '/gallery/rename',
		method: 'POST',
		data
	})
}

export const remove = (data) => {
	return uni.request({
		url: '/gallery/delete',
		method: 'POST',
		data
	})
}

export const addKnowByGallery = (data) => {
	return uni.request({
		url: '/know/addByGallery',
		method: 'POST',
		data
	})
}