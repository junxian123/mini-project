
const datetimePickerType = {
	DATE: 'date',
	YEAR: 'year',
	MONTH_YEAR: 'month_year'
}

function zeroize(number) {
	return number <= 9 ? '0' + number : number.toString()
}

function getYearList(minDate, maxDate) {
	const yearList = []
	const minYear = minDate.getFullYear()
	const maxYear = maxDate.getFullYear()
	for(let index = minYear; index <= maxYear; index++) {
		yearList.push(index.toString())
	}
	return yearList
}

function getMonthList() {
	return ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
}

function getDateList(date) {
	const dateList = []
	for(let index = 1; index<=date; index++) {
		dateList.push(zeroize(index))
	}
	return dateList
}

function isLeapYear(year) {
	return year % 4 === 0 || year % 400 === 0 
}


/**
 * 日期格式化
 * @param {} date 
 * @param {*} fmt 
 */
function format(date, fmt) {
	let ret;
	const opt = {
		"Y+": date.getFullYear().toString(),        // 年
		"m+": (date.getMonth() + 1).toString(),     // 月
		"d+": date.getDate().toString(),            // 日
		"H+": date.getHours().toString(),           // 时
		"M+": date.getMinutes().toString(),         // 分
		"S+": date.getSeconds().toString()          // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}

/**
 * 是否是非法的date
 * @param {} date 
 */
function isIllegalDate(date) {
	return Number.isNaN(date.getTime())
}

export {
	datetimePickerType,
	getYearList,
	getMonthList,
	getDateList,
	isLeapYear,
	format,
	isIllegalDate
}