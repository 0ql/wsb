declare const LightweightCharts: any;
declare const Stocks: any

let stocks = new Stocks('09340AU0QI9YSID8')

let darkTheme = {
	chart: {
		layout: {
			backgroundColor: "#242532",
			lineColor: "#2B2B43",
			textColor: "#D9D9D9",
		},
		watermark: {
			color: "rgba(0, 0, 0, 0)",
		},
		crosshair: {
			color: "#758696",
		},
		grid: {
			vertLines: {
				color: "#2B2B43",
			},
			horzLines: {
				color: "#363C4E",
			},
		},
	},
	series: {
		topColor: "rgba(32, 226, 47, 0.56)",
		bottomColor: "rgba(32, 226, 47, 0.04)",
		lineColor: "rgba(32, 226, 47, 1)",
	},
}

const MESSAGES = {
	0: `You must first claim your API Key at blablabla`,
	1: 'No options specified!',
	2: 'No `symbol` option specified!',
	3: `No (correct) 'interval' option specified`,
	4: `Only 'start'-'end' OR 'amount' can be specified!`,
	5: `No 'indicator' option specified!`,
	6: `No 'time_period' option specified!`,
	7: `No (correct) 'interval' option specified`,
	8: `No 'amount' option specified, returning maximum amount of datapoints`,
	9: 'An error occured during the API request. Please create an issue at ' +
		'https://github.com/wagenaartje/stocks/issues with your code',
	10: `'start' specified, but 'end' not specified. Using today's date as ` +
		`end date!`,
	11: `No 'series_type' option specified`,
	12: `The indicator specified does not exist. Please check the Alpha Vantage
       list of indicators https://www.alphavantage.co/documentation/#technical-indicators`
};

export class mainChart {
	el: HTMLElement
	chart: any
	series: any
	seriesType: string
	data: any
	rawData: any
	interval: string
	currentStock: string
	recent: string[]
	hide: Function
	show: Function

	constructor(hide: Function, show: Function) {
		this.hide = hide
		this.show = show
		this.recent = []
		this.seriesType = "area" // "area" or "candles"
	}

	init(el: HTMLElement) {
		this.el = el
		this.chart = LightweightCharts.createChart(el, {
			width: window.innerWidth * 0.45,
			height: window.innerHeight * 0.70,
			rightPriceScale: {
				borderVisible: false,
			},
			timeScale: {
				borderVisible: false,
				timeVisible: true,
			},
			priceScale: {
				mode: 0,
				autoScale: true,
				alignLabels: false,
				borderVisible: false,
				borderColor: '#555ffd',
				scaleMargins: {
					top: 0.30,
					bottom: 0.25,
				},
			},
		})

		Stocks.prototype._throw = (code, type) => {
			if (type === 'error') {
				if (code === 9) this.fail()
				else throw new Error(`${code}: ${MESSAGES[code]}`);
			} else if (type === 'warning') {
				console.warn(`${code}: ${MESSAGES[code]}`);
			}
		}

		window.onresize = () => {
			this.chart.resize(window.innerWidth * 0.45, window.innerHeight * 0.70);
		}

		this.setDarkTheme()

		this.seriesType === "area" ? this.createAreaSeries() : this.createCandles()
	}

	createAreaSeries() {
		this.seriesType = "area"
		if (this.series) this.chart.removeSeries(this.series)

		this.series = this.chart.addAreaSeries({
			topColor: "rgba(33, 150, 243, 0.56)",
			bottomColor: "rgba(33, 150, 243, 0.04)",
			lineColor: "rgba(33, 150, 243, 1)",
			lineWidth: 2,
		})
		this.series.applyOptions(darkTheme.series)
		if (this.data) this.draw()
	}

	createCandles() {
		this.seriesType = "candles"
		if (this.series) this.chart.removeSeries(this.series)

		this.series = this.chart.addCandlestickSeries()
		if (this.data) this.draw()
	}

	/** Update this.data to the currently needed Format */
	parse() {
		if (this.seriesType === "area") {
			this.data = this.rawData.map((el) => {
				return {
					time: Math.floor(el.date.getTime() / 1000),
					value: el.close,
				};
			}).reverse()
		} else {
			this.data = this.rawData.map((el) => {
				return {
					time: Math.floor(el.date.getTime() / 1000),
					open: el.open,
					high: el.high,
					low: el.low,
					close: el.close,
				};
			}).reverse()
		}
	}

	drawStock(name: string, interval: string = this.interval, toRecent: boolean = false, callBack?: Function) {
		if (interval) this.interval = interval
		this.hide()
		if (toRecent) this.recent.push(name)

		getStockData(name, interval).then((rawData) => {
			this.rawData = rawData

			this.draw()

			this.currentStock = name

			this.show()
			if (callBack) callBack()
		});
	};

	setDarkTheme() {
		this.chart.applyOptions(darkTheme.chart)
	}

	draw() {
		this.parse()
		this.series.setData(this.data);
		this.chart.timeScale().fitContent();
	}

	fail() { //TODO: HIDE WHEN LOADING DATA
		this.recent.pop() // remove Invalid Stock
		this.drawStock("GME", "daily", false)
	}
}

export const getStockData = async (name: string, interval: string) => {

	let result = await stocks.timeSeries({
		symbol: name,
		interval: interval,
		// start: new Date('2020-01-01'),
		// end: new Date(Date.now())
		amount: 500
	})

	return result
}

