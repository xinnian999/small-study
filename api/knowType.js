export const list = () => {
	return uni.request({
		url: '/knowType/list',
		method: 'GET',
	})
}

export const detail = (data) => {
	return uni.request({
		url: '/knowType/detail',
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

export const deleteType = (id) => {
	return uni.request({
		url: '/knowType/delete' + `?id=${id}`,
		method: 'DELETE',
	})
}