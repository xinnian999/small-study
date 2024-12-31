# cc-gonggeGrid


##uniapp专属精品组件页面模板（由前端组件开发出品）精品组件页面模板

###●组件模板规划：
由前端组件开发出品的精品组件页面模板，将陆续发布，预计高达约几百种供您使用，是快速快发项目、创业的必备精品。

合集地址： uni-app模板合集地址：(https://ext.dcloud.net.cn/publisher?id=274945) 如查看全部页面模板，请前往上述uniapp插件市场合集地址；

###●组件模板效果图：
可下载项目后预览，效果图见右侧图片；

###●组件模板费用：
学习：免费下载，进行学习，无费用；

使用/商用：本页面地址赞赏10元后，可终身商用；

###●组件模板使用版权/商用：
本组件模板免费下载可供学习，如需使用及商用，请在本组件页面模板进行赞赏10元

（仅需10元获取精品页面模板代码-物有所值，1个组件页面市场价100元 ）

赞赏10元后（当前项目产生赞赏订单可追溯）即可终身商用当前本地址下载的页面模版代码，不同下载地址需进行不同的赞赏。（不赞赏就进行商用使用者，面临侵权！保留追究知识产权法律责任！后果自负！）

### 我的技术公众号(私信可加前端技术交流群)

群内气氛挺不错的，应该或许可能大概，算是为数不多的，专搞技术的前端群，偶尔聊天摸鱼

![图片](https://i.postimg.cc/RZ0sjnYP/front-End-Component.jpg)



#### 使用方法 
```使用方法
	
<!-- gridTitle:宫格名称 gridNum: 一行展示格数 gridList：宫格数据 @gridClick:宫格点击按钮 -->
<cc-gonggeGrid gridTitle="九宫格" gridNum="3" :gridList="gridList" @gridClick="gridClick"></cc-gonggeGrid>

<!-- gridTitle:宫格名称 gridNum: 一行展示格数 gridList：宫格数据 @gridClick:宫格点击按钮 -->
<cc-gonggeGrid gridTitle="十二宫格" gridNum="4" :gridList="gridList" @gridClick="gridClick"></cc-gonggeGrid>

<!-- gridTitle:宫格名称 gridNum: 一行展示格数 gridList：宫格数据 @gridClick:宫格点击按钮 -->
<cc-gonggeGrid gridTitle="十五宫格" gridNum="5" :gridList="gridList" @gridClick="gridClick"></cc-gonggeGrid>


```

#### HTML代码实现部分
```html
<template>
	<view>

		<!-- gridTitle:宫格名称 gridNum: 一行展示格数 gridList：宫格数据 @gridClick:宫格点击按钮 -->
		<cc-gonggeGrid gridTitle="九宫格" gridNum="3" :gridList="gridList" @gridClick="gridClick"></cc-gonggeGrid>

		<!-- gridTitle:宫格名称 gridNum: 一行展示格数 gridList：宫格数据 @gridClick:宫格点击按钮 -->
		<cc-gonggeGrid gridTitle="十二宫格" gridNum="4" :gridList="gridList" @gridClick="gridClick"></cc-gonggeGrid>

		<!-- gridTitle:宫格名称 gridNum: 一行展示格数 gridList：宫格数据 @gridClick:宫格点击按钮 -->
		<cc-gonggeGrid gridTitle="十五宫格" gridNum="5" :gridList="gridList" @gridClick="gridClick"></cc-gonggeGrid>

	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {

				gridList: [{
						name: '功能1',
						imgSrc: "../../static/appointList.svg",
					},
					{
						name: '功能2',
						imgSrc: "../../static/appointNum.svg",
					},
					{
						name: '功能3',
						imgSrc: "../../static/appointList.svg",
					},
					{
						name: '功能4',
						imgSrc: "../../static/appointNum.svg",
					},
					{
						name: '功能5',
						imgSrc: "../../static/appointList.svg",
					},
					{
						name: '功能6',
						imgSrc: "../../static/appointNum.svg",
					},
					{
						name: '功能7',
						imgSrc: "../../static/appointList.svg",
					},
					{
						name: '功能8',
						imgSrc: "../../static/appointNum.svg",
					},
					{
						name: '功能9',
						imgSrc: "../../static/appointNum.svg",
					},


				]
			}
		},

		methods: {
			gridClick(item, index) { //格子菜单点击事件



				console.log('item = ' + item.name + 'index = ' + index);
				uni.showModal({
					title: '温馨提示',
					content: '点击的功能是: ' + item.name
				})


			}
		}
	}
</script>

<style lang="less" scoped>

</style>
```
