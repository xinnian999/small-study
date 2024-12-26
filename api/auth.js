export const login = (data) => {
	return uni.request({
		url: '/auth/login',
		method: 'POST',
		data
	})
}

export const register = (data) => {
	return uni.request({
		url: '/auth/register',
		method: 'POST',
		data
	})
}

export const getUserInfo = (data) => {
	return uni.request({
		url: '/auth/profile',
		method: 'GET',
		data
	})
}

export const setUserInfo = (data) => {
	return uni.request({
		url: '/auth/updateUserInfo',
		method: 'PUT',
		data
	})
}