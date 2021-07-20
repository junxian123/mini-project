// pages/home/home.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		value: '',
		unit: {
			year: '年'
		},
		tableColumns: [{
			prop: 'company',
			label: '公司',
			width: 200,
			fixed: 'left'
		}, {
			prop: 'lastMonth',
			label: '上月余额',
			width: 200
		}, {
			prop: 'curentIncomeDebt',
			label: '当月收贷',
			width: 200
		}, {
			prop: 'curentOutcomeDebt',
			label: '当月还贷',
			width: 200
		}, {
			prop: 'currentMonth',
			label: '当月余额',
			width: 200
		}, {
			prop: 'currentProfit',
			label: '当月利息',
			width: 200
		}, {
			prop: 'yearProfit',
			label: '年利率',
			width: 200
		}],
		tableData: []
	},


	handleConfirm(event) {
		console.log(event)
	},

	handleYearChange(event) {
		console.log(event)
	},

	onLoad: function (options) {
		const tableData = [{
			company: '合同机构',
			lastMonth: 888,
			curentIncomeDebt: 888,
			curentOutcomeDebt: 888,
			currentMonth: 888,
			currentProfit: 888,
			yearProfit: 888
		}]
		this.setData({
			tableData: [...tableData, ...tableData,...tableData, ...tableData, ...tableData, 
				...tableData, ...tableData, ...tableData, ...tableData, ...tableData, ...tableData, 
				...tableData, ...tableData, ...tableData,
				...tableData, ...tableData, ...tableData,
				...tableData, ...tableData, ...tableData,
				...tableData, ...tableData, ...tableData]
		})
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})