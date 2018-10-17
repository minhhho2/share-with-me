import _ from 'lodash';

/* 
    Finds the key for the stock price time series data from alpha vantage api call response.
    The key name is dependent on the period selected, thus, it can be different.
*/
export function getTimeSeriesKey(keys) {

    const DESIRED_RESP_KEYS = ['Time Series (Daily)', 'Weekly Time Series', 'Monthly Time Series'];

    const possibleKeys = DESIRED_RESP_KEYS.filter(e => keys.includes(e));

    if (possibleKeys.length === 1) {
        console.log(possibleKeys[0]);
        return possibleKeys[0];
        
    } else {
        
        throw new Error(`Time Series Key was not among the keys from the response: ${keys}`);
    }
}

/* 
    Sort time series data objects into oldest to newest
    a = {
        date: Date Object,
        price: price in string
    }
*/
export function sortObjectsByDate(data) {

    var newData = data.slice();

    newData.sort((a, b) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });

    return newData;
}





/* 

    const DESIRED_RESP_KEY = 'Time Series (Daily)';

    if (keys.includes(DESIRED_RESP_KEY)) {
        return DESIRED_RESP_KEY;

    } else {
        throw new Error(`Time Series (Monthly) was not among the keys from the response: ${keys}`);
    }

*/