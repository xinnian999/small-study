export const userAvatar = (files) => {
	// console.log(files)
	return uni.uploadFile({
		url: '/upload/userAvatar',
		files,
		formData: {}
	})
}

export const gallery = (files, data) => {
	return uni.uploadFile({
		url: '/upload/gallery',
		files,
		formData: data,
	})
}