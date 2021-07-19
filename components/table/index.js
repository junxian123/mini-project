// components/table/index.js
Component({
	externalClasses: ['lv-header-class'],
	properties: {
		tableColumns: Array,
		tableData: Array,
		fixed: {
			type: Boolean,
			optionalTypes: [String]
		},
		border: Boolean,
		height: {
			type: Number,
			optionalTypes: [String],
			value: 'auto'
		}
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
