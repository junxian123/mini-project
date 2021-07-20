// components/table/index.js
Component({
	externalClasses: ['lv-header-class'],
	properties: {
		tableColumns: Array,
		tableData: Array,
		leftFixedColumn: Object,
		border: Boolean,
		height: {
			type: Number,
			optionalTypes: [String],
			value: 'auto'
		},
		oddBgColor: String,
		evenBgColor: String,
		headerBgColor: String
	},

	observers: {
		tableColumns(columns) {
			const scrollWidth = columns.reduce((prev, next) => {
				return prev + next.width
			}, 0)
			this.setData({
				scrollWidth
			})
		},
	},

	data: {
		scrollWidth: '100%'
	},

	methods: {

	}
})
