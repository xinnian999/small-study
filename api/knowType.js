export const list = () => {
	return uni.request({
		url: '/knowType/list',
		method: 'GET',
	})
}

// export const deleteGallery = (data) => {
// 	return uni.request({
// 		url: '/gallery/delete',
// 		method: 'POST',
// 		data
// 	})
// }