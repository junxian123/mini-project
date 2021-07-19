
/**
 * 节流函数
 * @param {Function} callback 回调函数
 * @param {number} delay 时间(ms)，指定每隔多少毫秒执行一次
 */
function throttle(callback, delay = 100) {
	let timer = null

	return function() {
		if(timer) {
			return
		}
		timer = setTimeout(() => {
			callback.call(this, ...arguments)
			timer = null
		}, delay)
	}
}


/**
 * 获取系统信息（宽度、高度、安全区域）
 */
function getSystemInfo() {
	const {screenWidth,screenHeight, windowWidth, windowHeight, statusBarHeight, safeArea} =  wx.getSystemInfoSync()
	return {
		screenWidth,
		screenHeight,
		windowWidth,
		windowHeight,
		statusBarHeight,
		safeArea
	}
}

/**
 * 单位转换 px => rpx
 * @param {number} px 要转换的px
 */
function pxToRpx(px) {
	const {screenWidth} = wx.getSystemInfoSync()
	return 750 / screenWidth * px
}

/**
 * 获取自定义参数 data-xxx
 * @param {object} event 事件对象
 * @param {string} name  参数名称
 */
function getDataSet(event, name) {
	if(name) {
		return event.currentTarget.dataset[name]
	}
	return event.currentTarget.dataset
}

/**
 * 获取自定义事件参数
 * @param {object} event 事件对象
 * @param {string} name  参数名称
 */
function getEventParam(event, name) {
	if(name) {
		return event.detail[name]
	}
	return event.detail
}

export {
	throttle,
	getSystemInfo,
	pxToRpx,
	getDataSet,
	getEventParam
}