
import promisic from '../utils/promisic'
import Config from '../config/index'
import codes from '../config/code-message'

class Http {

	/**
	 * 发送请求
	 * @param {object} param0
	 */
	static async request({url, data, method = 'GET', refetch = true}) {
		let res
		try {
			res = await promisic(wx.request)({
				url: Config.baseUrl + url,
				data,
				method,
				header: {
					'token': Token.getTokenFromLocal()
				}
			})
		} catch (error) {
			Http._showError(-1)
			throw new Error(codes[-1])
		}
		res = res.data
		if(res.code === 200) {
			return res.data
		} else {
			// TODO
		}
	}

	/**
	 * 错误信息提示
	 * @param {number} errorCode 接口返回error_code
	 * @param {string} message 接口返回message
	 */
	static _showError(errorCode, message) {
		let tip
		if(errorCode == null) {
			tip = codes[9999]
		} else {
			if(codes[errorCode]) {
				tip = codes[errorCode]
			} else {
				tip = typeof message !== 'object' ? message : Object.values(message).join('；')
			}
		}
		wx.showToast({
			icon: 'none',
			title: tip
		})
	}

	/**
	 * 二次重发
	 * @param {object} data 请求参数
	 */
	// static async _refetch(data) {
	// 	await User.login()
	// 	data.refetch = false
	// 	return await Http.request(data)
	// }
}

export {
	Http
}