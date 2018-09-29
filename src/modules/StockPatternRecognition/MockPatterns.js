const MockPattern = {
    periodOptions: [
        'TIME_SERIES_INTRADAY',
        'TIME_SERIES_DAILY',
        'TIME_SERIES_WEEKLY',
        'TIME_SERIES_MONTHLY'
    ], 
    symbol: {
        exchangeOptions: [

        ],
        tickerOptions: [

        ]
    },
    intervalOptions: [
        '1min', '5min', '15min', '30min', '60min'
    ],
    outputSizeOptions: [
        'compact',  // 1st 100 data points
        'full'      // full length up to 20 years
    ],
}

module.exports = MockPattern;