import { Http } from "./http"

class Paging {
	// 请求参数
	req = {}
	// 分页页码，指定从几页开始查询
	page
	// 分页内容条数，指定每页显示多少条数据
	count
	// 是否有更多数据
	moreData = true
	// 锁，目的为了节流，防止用户频繁请求
	locker = false
	accumulator = []

	/**
	 * 
	 * @param {object} req 
	 * @param {number} page 
	 * @param {number} count 
	 */
	constructor(req, page = 1, count = 10) {
		this.req = req
		this.page = page
		this.count = count
	}

	/**
	 * 获取数据
	 */
	async getData() {
		// 判断是否有数据
		if(!this.moreData) {
			return
		}
		// 判断是否正在处理请求
		if(!this._getLocker()) {
			return
		}
		const data = await this._getActualData()
		// 释放锁
		this._releaseLocker()
		return data
	}


	/**
	 * 请求接口获取数据
	 */
	async _getActualData() {
		this._getCurrentReq()
		const paging = await Http.request(this.req)

		// paging 有可能为空，以防万一
		if(paging == null) {
			return null
		}

		// 没有数据的情况
		if(paging.total === 0) {
			this.moreData = false
			return {
				moreData: false,
				items: [],
				accumulator: []
			}
		}

		// 有数据的情况
		const items = paging.data
		this.accumulator = this.accumulator.concat(items)
		this.moreData = this._hasMoreData(paging.current_page, paging.last_page)
		if(this.moreData) {
			this.page += 1
		}
		return {
			moreData: this.moreData,
			accumulator: this.accumulator,
			items,
		}
	}

	/**
	 * 判断 是否有更多数据
	 * @param {*} page 当前页
	 * @param {*} lastPage 最后一页
	 */
	_hasMoreData(page, lastPage) {
		return lastPage > page
	}

	/**
	 * 处理请求参数
	 */
	_getCurrentReq() {
		let url = this.req.url
		const params = `page=${this.page}&count=${this.count}`
		url.includes('?') ? url += `&${params}` : url += `?${params}`
		this.req.url = url
	}

	/**
	 * 获取锁
	 */
	_getLocker() {
		if(this.locker) {
			return false
		}
		this.locker = true
		return true
	}

	/**
	 * 释放锁
	 */
	_releaseLocker() {
		this.locker = false
	}
}

export {
	Paging
}