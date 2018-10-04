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
            key: 'ASX:ANZ',
            text: 'ASX:ANZ',
            value: 'ASX:ANZ',
        },  
        {
            key: 'ASX:CBA',
            text: 'ASX:CBA',
            value: 'ASX:CBA',
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
    ]
}

module.exports = OPTIONS;