

/**
 * 微信api promise化
 * @param {Function} fn 需要转换的微信api
 */
function promisic(fn) {
	return function(options = {}) {
		return new Promise((resolve, reject) => {
			Object.assign(options, {
				success: (res) => {
					resolve(res)
				},
				fail: (err) => {
					reject(err)
				}
			})
			fn(options)
		})
	}
}

export default promisic