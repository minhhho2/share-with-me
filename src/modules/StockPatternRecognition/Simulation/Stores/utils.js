import _ from 'lodash';

/* 
    Finds the key for the stock price time series data from alpha vantage api call response.
    The key name is dependent on the period selected, thus, it can be different.
*/
export function getTimeSeriesPriceKeyFromResponse(keys) {

    const key = keys.filter(key => {
        const words = key.split(' ');
        return words.includes('Time') && words.includes('Series');
    });

    if (key.length != 1) {
        console.log("The keys given are " + keys);
        throw new Error(
            `Time Series Key was not among the keys from the response: ${keys}`
        );
    }

    return key[0];
}

/* 
    Sort time series data objects into oldest to newest
    a = {
        date: Date Object,
        price: price in string
    }
*/
export function sortTimeSeriesDataByPrice(data) {

    var newData = data.slice();

    newData.sort((a, b) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });
    // newData.forEach((data, index) => { console.log(index + ": " + data.date); });

    return newData;
}

/* 
    Create array of {x: ..., y: ...} for react-viz chart
*/
export function createGraphDataFromArrayOfValues(values) {

    var data = values.map((value, index) => {
        return {
            x: index,
            y: value
        }
    });

    return data;
}

/* 
    Normalize measurement array. Scales values in measurement array to the min max range of targetArr
*/
export function normalize(measurementArr, targetArr){
    const rMin = _.min(measurementArr);
    const rMax = _.max(measurementArr);
    const tMin = _.min(targetArr);
    const tMax = _.max(targetArr);

    const normalized = measurementArr.map(el => {
        var normalizedValue = (el - rMin)/(rMax - rMin) * (tMax - tMin) + tMin;
        return parseFloat(normalizedValue.toFixed(2));
    });

    return normalized;
}