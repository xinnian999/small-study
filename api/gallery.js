export const list = (data) => {
	return uni.request({
		url: '/gallery/list',
		method: 'GET',
		data
	})
}