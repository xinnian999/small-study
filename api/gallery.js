export const list = (data) => {
	return uni.request({
		url: '/gallery/list',
		method: 'GET',
		data
	})
}

export const deleteGallery = (data) => {
	return uni.request({
		url: '/gallery/delete',
		method: 'POST',
		data
	})
}