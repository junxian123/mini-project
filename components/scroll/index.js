import { getSystemInfo, pxToRpx } from "../../utils/index"

Component({
	properties: {
		scrollX: Boolean,
		scrollY: Boolean,
		minusHeight: {
			type: Number,
			value: 0
		},
		enhanced: Boolean,
		refresherEnabled: Boolean,
		// 下拉刷新状态
		refresherTriggered: Boolean,
		showScrollbar: Boolean,
		// 是否需要计算安全区域
		safeArea: Boolean
	},

	lifetimes: {
		attached() {
			this._initScrollHeight()
		}
	},

	data: {
		scrollHeight: 0
	},

	methods: {
		handleScrollToLower(event) {
			this.triggerEvent('scrolltolower', { event })
		},
		
		handleRefresherRefresh(event) {
			this.triggerEvent('refresherrefresh', { event })
		},
		
		/**
		 * 初始化scroll-view高度
		 */
		_initScrollHeight() {
			const {windowHeight, screenHeight, safeArea, statusBarHeight} = getSystemInfo()
			let scrollHeight = 0
			if(this.data.safeArea) {
				const titleBar = screenHeight - windowHeight - statusBarHeight
				scrollHeight = pxToRpx(safeArea.height - titleBar - this.data.minusHeight)
			} else {
				scrollHeight = pxToRpx(windowHeight - this.data.minusHeight)
			}
			this.setData({
				scrollHeight
			})
		},
	}
})
