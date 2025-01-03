export const list = (data) => {
	return uni.request({
		url: '/knowType/list',
		method: 'GET',
		data
	})
}

export const add = (data) => {
	return uni.request({
		url: '/knowType/add',
		method: 'POST',
		data
	})
}

export const update = (data) => {
	return uni.request({
		url: '/knowType/update',
		method: 'PUT',
		data
	})
}

export const remove = (id) => {
	return uni.request({
		url: '/knowType/delete' + `?id=${id}`,
		method: 'DELETE',
	})
}