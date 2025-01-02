<template>

	<view class="typeDetail">
		<uni-list-item style="margin-bottom: 20px;" :title="info.name" :note="info.desc" :thumb="iconPath(info.icon)" thumb-size="base" clickable>
			<template v-slot:footer>
				<view class="editBtn">
					<button @click="goEdit" size="mini" type="primary">编辑</button>
				</view>
			</template>
		</uni-list-item>


		<kevy-empty  :show="true" type="list" text="还没有图片, 创建一个吧"></kevy-empty>
	</view>

</template>

<script setup>
	import {
		ref,
		reactive,
		toRefs,
		onMounted
	} from "vue"
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import * as knowTypeApi from '@/api/knowType.js'
	import iconPath from "@/utils/iconPath"
	import {
		useKaStore
	} from "./store"

	const kaStore = useKaStore()

	const {
		currentType: info
	} = toRefs(kaStore)

	const goEdit = () => {
		uni.navigateTo({
			url: '/pages/tabBar/User/KnowAdmin/EditType',
		})
	}
	
	onMounted(()=>{
		uni.setNavigationBarTitle({
			title: `识图管理-${info.value.name}`
		});
	})
</script>

<style lang="scss">
	.typeDetail {
		padding: 20px;

		.editBtn {
			display: flex;
			align-items: center;
		}
	}
</style>