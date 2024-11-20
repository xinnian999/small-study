// stores/counter.js
import {
	defineStore
} from 'pinia';

const mock = [{
		img: 'https://web-assets.dcloud.net.cn/unidoc/zh/shuijiao.jpg',
		yes: 0,
		no: 0
	},
	{
		img: 'https://img1.baidu.com/it/u=1734482911,583275848&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1372',
		yes: 0,
		no: 0
	},
	{
		img: 'https://img2.baidu.com/it/u=546282302,1627291091&fm=253&fmt=auto&app=120&f=JPEG?w=1228&h=800',
		yes: 0,
		no: 0
	}
]

export const useKnowListStore = defineStore('know', {
	state: () => {
		return {
			dataSource: mock
		};
	},
	// 也可以这样定义
	// state: () => ({ count: 0 })
	actions: {
		increment() {
			this.count++;
		},
	},
});