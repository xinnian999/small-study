<template>
	<uni-section title="功能菜单" type="line">
		<uni-list>
			<uni-list-item title="识图" to="/pages/tabBar/Home/know" />
			<uni-list-item title="识图错题集"  to="/pagestabBar/Home/know-errors" :rightText="knowStore?.errors.length+ '个'" />
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

</script>

<style>

</style>