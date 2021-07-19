import { datetimePickerType, getYearList, getMonthList, getDateList, format, isIllegalDate } from './util'
const _date = new Date()
Component({
	// 定义私有属性规则，私有属性是无法在模板中显示
	options: {
		pureDataPattern: /^_/
	},
	externalClasses: ['lv-class', 'lv-toolbar-class', 'lv-picker-view-class'],
	properties: {
		value: {
			type: String,
			optionalTypes: [Number]
		},
		type: {
			type: String,
			value: 'date'
		},
		minDate: {
			type: Number,
			value: new Date(_date.getFullYear() - 50, 0, 0).getTime()
		},
		maxDate: {
			type: Number,
			value: new Date(_date.getFullYear() + 50, 0, 0).getTime()
		},
		showToolbar: {
			type: Boolean,
			value: true
		},
		confirmButtonText: {
			type: String,
			value: '确认'
		},
		cancelButtonText: {
			type: String,
			value: '取消'
		},
		confirmColor: {
			type: String,
			value: '#3963BC'
		},
		cancelColor: {
			type: String,
			value: '#969799'
		},
		title: {
			type: String,
			value: ''
		},
		titleColor: {
			type: String,
			value: ''
		},
		indicatorStyle: String,
		maskStyle: {
			type: String
		},
		itemHeight: {
			type: Number,
			value: 36
		},
		visibleItemCount: {
			type: Number,
			value: 5
		},
		dateFormat: {
			type: String,
			value: 'YYYY-mm-dd'
		},
		border: {
			type: Boolean,
			value: true
		},
		unit: Array
	},

	observers: {
		value: function() {
			if(this.data.value) {
				if(isIllegalDate(new Date(this.data.value))) {
					throw new Error('value值不合法, 无法转换date类型')
				}
				this._init()
			}
		}
	},
	
	data: {
		datetimePickerType,
		height: 0,
		valueList: [],
		yearList: [],
		monthList: [],
		dateList: [],
		_valueList: [],
		_monthIndex: null,
		_yearIndex: null,
	},

	lifetimes: {
		attached() {
			this._initPickerViewHeight()
			this._init()
		}
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		_init() {
			const type = this.data.type
			let {minDate, maxDate} = this.data
			minDate = new Date(minDate)
			maxDate = new Date(maxDate)
			switch(type) {
				case datetimePickerType.DATE:
					this._initDate(minDate, maxDate)
					break
				case datetimePickerType.YEAR:
					this._initYear(minDate, maxDate)
					break
				case datetimePickerType.MONTH_YEAR:
					this._initMonthYear(minDate, maxDate)
					break
			}
		},

		/**
		 * 计算筛选区域高度，不包含toolbar
		 */
		_initPickerViewHeight() {
			this.setData({
				height: this.data.itemHeight * this.data.visibleItemCount
			})
		},

		handleChange(event) {
			const value = event.detail.value
			const type = this.data.type
			this.data._valueList = value
			// 只有需要"日"的时候，需要特殊处理，因为“日”它会根据年份和月份变化的
			switch(type) {
				case datetimePickerType.DATE:
					this._processDateChange(value[0],value[1])
					break;
				case datetimePickerType.YEAR:
					break
				case datetimePickerType.MONTH_YEAR:
					break
			}
			if(!this.data.showToolbar) {
				this.handleConfirm()
			}
		},

		handleConfirm() {
			const type = this.data.type
			let result
			switch(type) {
				case datetimePickerType.DATE:
					result = this._processDateConfirm()
					break
				case datetimePickerType.YEAR:
					result = this._processYearConfirm()
					break
				case datetimePickerType.MONTH_YEAR:
					result = this._processMonthYearConfirm()
			}

			if(result.includes('NaN')) {
				throw new Error('value值不合法, 无法转换date类型')
			}
			
			let eventName = this.data.showToolbar ? 'confirm' : 'change'
			this.triggerEvent(eventName, {
				value: result
			})
		},

		handleCancel() {
			this.triggerEvent('cancel')
		},

		/**
		 * 处理年月日确认
		 */
		_processDateConfirm() {
			const [yearIndex,monthIndex,dateIndex] = this.data._valueList
			const year = this.data.yearList[yearIndex]
			const month = this.data.monthList[monthIndex] - 1
			const date = this.data.dateList[dateIndex]
			return format(new Date(year, month, date), this.data.dateFormat)
		},

		/**
		 * 处理年月确认
		 */
		_processMonthYearConfirm() {
			const [yearIndex,monthIndex] = this.data._valueList
			const year = this.data.yearList[yearIndex]
			const month = this.data.monthList[monthIndex] - 1
			return format(new Date(year, month), this.data.dateFormat)
		},

		/**
		 * 处理年份确认
		 */
		_processYearConfirm() {
			const yearIndex = this.data._valueList[0]
			const year = this.data.yearList[yearIndex]
			console.log(year)
			return year
		},

		/**
		 * 处理type为date类型，change事件的业务逻辑
		 * @param {*} yearIndex 
		 * @param {*} monthIndex 
		 */
		_processDateChange(yearIndex, monthIndex) {
			if(this._isYearAndMonthNoChange(yearIndex, monthIndex)) {
				return
			}

			if(this._isYearChange(monthIndex)) {
				this._setDateList(yearIndex, monthIndex)
				return
			}

			this._setDateList(yearIndex, monthIndex)
		
		},

		_setDateList(yearIndex, monthIndex) {
			const date = new Date(this.data.yearList[yearIndex], this.data.monthList[monthIndex], 0)
			const dateList = getDateList(date.getDate())
			this.data._yearIndex = yearIndex
			this.data._monthIndex = monthIndex
			this.setData({
				dateList
			})
		},

		/**
		 * 初始化DATE类型的数据
		 */
		_initDate(minDate, maxDate) {
			const _currentDate = new Date(_date.getFullYear(), _date.getMonth(), 0)
			const yearList = getYearList(minDate, maxDate)
			const monthList = getMonthList()
			const dateList = getDateList(_currentDate.getDate())
			this._bindValue({
				yearList,
				monthList,
				dateList
			}, minDate)
		},

		/**
		 * 初始化YEAR类型数据
		 */
		_initYear(minDate, maxDate) {
			const yearList = getYearList(minDate, maxDate)
			this._bindValue({
				yearList
			}, minDate)
		},

		
		/**
		 * 初始化MONTH_YEAR类型数据
		 */
		_initMonthYear(minDate, maxDate) {
			const yearList = getYearList(minDate, maxDate)
			const monthList = getMonthList()
			this._bindValue({
				yearList,
				monthList
			}, minDate)
		},
		
		/**
		 * 绑定数据
		 * @param {object} allList 至少有一个yearList，也有可能其他List都有
		 * 
		 */
		_bindValue(allList, minDate) {
			this.setData({
				...allList
			}, () => {
				const valueList = this._getValue(minDate)
				this.setData({
					valueList,
					_valueList: valueList
				})
			})
		},

		_getValue(minDate) {
			const date = this.data.value ? new Date(this.data.value) : _date
			const yearIndex = date.getFullYear() - minDate.getFullYear()
			const monthIndex = date.getMonth()
			const dateIndex = date.getDate() - 1

			switch(this.data.type) {
				case datetimePickerType.DATE: 
					return [yearIndex, monthIndex, dateIndex]
				case datetimePickerType.YEAR:
					return [yearIndex]
				case datetimePickerType.MONTH_YEAR:
					return [yearIndex, monthIndex]
			}
		},

		/**
		 * 判断年份和月份是否改变
		 * @param {*} monthIndex 
		 * @param {*} yearIndex
		 */
		_isYearAndMonthNoChange(monthIndex, yearIndex) {
			return this.data._monthIndex === monthIndex && this.data._yearIndex === yearIndex
		},
		
		/**
		 * 当只有年份改变时,并且month为二月份时，才返回true
		 * @param {*} monthIndex 月份索引
		 */
		_isYearChange(monthIndex) {
			return this.data._monthIndex === monthIndex && Number.parseInt(this.data.monthList[monthIndex]) !== 2
		}

	}
})
