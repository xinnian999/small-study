import COS from 'cos-js-sdk-v5'
import {
	SecretId,
	SecretKey
} from '@/cos.js';

const cos = new COS({
	SecretId,
	SecretKey,
});

const common = {
	Bucket: 'quick-know666-1305519392',
	/* 填写自己的 bucket，必须字段 */
	Region: 'ap-guangzhou',
	/* 存储桶所在地域，必须字段 */
}

export const getList = ({
	type
}) => {
	return cos.getBucket({
		...common,
		Prefix: `images/${type}`,
		/* 列出目录 a 下所有文件，非必须 */
	})
}

export const uploadImages = ({
	fileName,
	file
}) => {
	return cos.uploadFile({
		...common,
		Key: `images/${fileName}`, // 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段
		Body: file, // 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象
		SliceSize: 1024 * 1024 * 5, // 触发分块上传的阈值，超过5MB使用分块上传，非必须
		onTaskReady: function(taskId) { // 非必须
			console.log(taskId);
		},
		onProgress: function(progressData) { // 非必须
			console.log(JSON.stringify(progressData));
		},
		// 支持自定义headers 非必须
		Headers: {
			// 'x-cos-meta-test': 123
		},
	})
}