import _ from 'lodash';
import { Coordinate } from '../../../../models/Coordinate';
/* 
    Finds the key for the stock price time series data from alpha vantage api call response.
    The key name is dependent on the period selected, thus, it can be different.
*/
export function getTimeSeriesKey(keys) {

    const DESIRED_RESP_KEY = 'Time Series (Daily)';

    if (keys.includes(DESIRED_RESP_KEY)) {
        return DESIRED_RESP_KEY;

    } else {
        throw new Error(`Time Series (Daily) was not among the keys from the response: ${keys}`);
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
    Create array of {x: ..., y: ...} for react-viz chart from array of values
    Used for time series data.
*/
export function createCoordinateData(values) {
    var data = values.map((value, index) => {
        return Coordinate(index, value);
    });

    return data;
}

/* 
    Normalize measurement array. Scales values in measurement array to the min max range of targetArr
*/
export function normalize(measurementArr, targetArr) {
    const rMin = _.min(measurementArr);
    const rMax = _.max(measurementArr);
    const tMin = _.min(targetArr);
    const tMax = _.max(targetArr);

    const normalized = measurementArr.map(el => {
        var normalizedValue = (el - rMin) / (rMax - rMin) * (tMax - tMin) + tMin;
        return parseFloat(normalizedValue.toFixed(2));
    });

    return normalized;
}