const baseURL = 'http://8.141.86.20:3000'

export const register = (data) => {
	return uni.request({
		url: baseURL + '/user/create',
		method: 'POST',
		data
	})
}

export const login = (data) => {
	return uni.request({
		url: baseURL + '/user/login',
		method: 'POST',
		data
	})
}