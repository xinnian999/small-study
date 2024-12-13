<template>
	<uni-section title="功能菜单" type="line">
		<uni-list>
			<uni-list-item title="识图" to="/pages/tabBar/Home/know" />
			<uni-list-item title="识图错题集"  to="/pagestabBar/Home/know-errors" :rightText="knowStore.errors.length+ '个'" />
			<uni-list-item title="重置数据" clickable @click="handleReset" />
		</uni-list>
	</uni-section>
</template>

<script setup>
	import {
		useKnowStore
	} from '@/stores/know';
	import COS from 'cos-js-sdk-v5';
	
	const knowStore = useKnowStore()
	
	const handleReset=()=>{
		uni.clearStorage()
	}
	const cos = new COS({
		// SecretId: 'AKIDGNo5LTfppeFhy72zqUt8UhfdNuCIApFS',
		// SecretKey: '6xZxLVR8bsDSUZaR9f0B9wXv795BD6tZ',
	});


	cos.getBucket({
		Bucket: 'quick-know-1305519392',
		/* 填写自己的 bucket，必须字段 */
		Region: 'ap-guangzhou',
		/* 存储桶所在地域，必须字段 */
		Prefix: 'images/',
		/* 列出目录 a 下所有文件，非必须 */
		Delimiter: '/'
	}, function(err, data) {
		// console.log(err || data.Contents);
		const list= data.Contents.slice(1).map(item => ({
			img: `https://quick-know-1305519392.cos.ap-guangzhou.myqcloud.com/${item.Key}`,
			yes: 0,
			no: 0
		}))
		knowStore.setDataSource(list)
	});
</script>

<style>

</style>