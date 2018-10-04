const ALPHA_OPTIONS = {
    periodOptions: [
        'TIME_SERIES_INTRADAY',
        'TIME_SERIES_DAILY',
        'TIME_SERIES_WEEKLY',
        'TIME_SERIES_MONTHLY'
    ],

    symbolOptions: [
        'ASX:XJO', 'ASX:CBA', 'ASX:ANZ'
    ],
    
    outputSizeOptions: [
        'compact',  // 1st 100 data points
        'full'      // full length up to 20 years
    ],
}

module.exports = ALPHA_OPTIONS;