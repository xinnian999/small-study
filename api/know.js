export const typeList = (data) => {
	return uni.request({
		url: '/knowType/list',
		method: 'GET',
	})
}

export const list = (data) => {
	return uni.request({
		url: '/know/list',
		method: 'GET',
		data
	})
}


export const update = (data) => {
	return uni.request({
		url: '/know/update',
		method: 'PUT',
		data
	})
}

export const addCorrect = (data) => {
	return uni.request({
		url: '/know/addCorrect',
		method: 'PUT',
		data
	})
}

export const addError = (data) => {
	return uni.request({
		url: '/know/addError',
		method: 'PUT',
		data
	})
}

export const remove = (id) => {
	return uni.request({
		url: '/know/delete' + `?id=${id}`,
		method: 'DELETE',
	})
}


export const addKnowByAlbum = (files, data) => {
	return uni.uploadFile({
		url: '/know/addByAlbum',
		files,
		formData: data
	})
}



export const reset = (data) => {
	return uni.request({
		url: '/know/reset',
		method: 'PUT',
		data
	})
}