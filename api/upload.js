export const userAvatar = (file) => {
	return uni.uploadFile({
		url: '/upload/userAvatar',
		file,
		formData: {}
	})
}

export const gallery = (files, data) => {
	return uni.uploadFile({
		url: '/upload/gallery',
		files,
		formData: data,
		name:'file'
	})
}