import COS from 'cos-js-sdk-v5';

const cos = new COS({
	SecretId: 'AKIDGOJENSbeV8Ymna9UdbLrKeleJrDbq4EC',
	SecretKey: 'ufJp9EEcx3ygAQUQCl6D6lBNLArQny20',
});

export const getList = () => {
	return cos.getBucket({
		Bucket: 'quick-know-1305519392',
		/* 填写自己的 bucket，必须字段 */
		Region: 'ap-guangzhou',
		/* 存储桶所在地域，必须字段 */
		Prefix: 'images/',
		/* 列出目录 a 下所有文件，非必须 */
		Delimiter: '/'
	})
}