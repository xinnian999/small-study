// export const list = (data) => {
// 	return uni.request({
// 		url: '/knowAdminApi/list',
// 		method: 'GET',
// 		data
// 	})
// }



// export const update = (data) => {
// 	return uni.request({
// 		url: '/knowAdminApi/update',
// 		method: 'PUT',
// 		data
// 	})
// }

export const remove = (id) => {
	return uni.request({
		url: '/know/delete' + `?id=${id}`,
		method: 'DELETE',
	})
}