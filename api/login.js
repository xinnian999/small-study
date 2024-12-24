// import { baseURL } from "./baseURL"

export const register = (data) => {
	return uni.request({
		url: '/user/create',
		method: 'POST',
		data
	})
}

export const login = (data) => {
	return uni.request({
		url: '/auth/login',
		method: 'POST',
		data
	})
}