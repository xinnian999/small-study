<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {},
		onHide: function() {
			console.log('App Hide')
		},
 
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #eee;
		position: relative;
	}

	.verticalCenter {
		display: flex;
		align-items: center;
	}

	.zmm-slider-verify-slider-touch {
		position: relative;
		z-index: 999;
	}
</style>