const OPTIONS = {
    period: [
        {
            key: 'TIME_SERIES_DAILY',
            text: 'TIME_SERIES_DAILY',
            value: 'TIME_SERIES_DAILY',
        },
        {
            key: 'TIME_SERIES_INTRADAY',
            text: 'TIME_SERIES_INTRADAY',
            value: 'TIME_SERIES_INTRADAY',
        }
    ],
    symbol: [
        {
            key: 'ASX:XJO',
            text: 'ASX:XJO',
            value: 'ASX:XJO',
        },
        {
            key: 'ASX:WHA',
            text: 'ASX:WHA',
            value: 'ASX:WHA',
        },  
    ],
    outputSize: [
        {
            key: 'compact',
            text: 'compact',
            value: 'compact',
        },
        {
            key: 'full',
            text: 'full',
            value: 'full',
        }
    ],
    interval: [
        {
            key: '5min',
            text: '5min',
            value: '5min'
        },
        {
            key: '10min',
            text: '10min',
            value: '10min'
        }
    ]
}

module.exports = OPTIONS;