import PARAMS from '../constants/Params';
import _ from 'lodash';
import { Coordinate } from '../../../models/Coordinate';


/* 
    Performs preprocessing techniques on raw time series financial data.
    rawTimeSeriesData is an object where the keys are dates.
*/
export function preprocess(rawTimeSeriesData) {
 
    const dateKeys = Object.keys(rawTimeSeriesData); // keys for dates
    var parsedData = [];    // Container for parsed data

    // Preprocessing phase
    dateKeys.forEach(dateKey => {

        // Data Cleansing - removing NaN or missing information
        const price = parseFloat(rawTimeSeriesData[dateKey]['4. close']);
        const date = new Date(dateKey);

        if (price === 0 || price === undefined) { return; }

        // Data Transformation - extracting
        parsedData.push({ date: date, price: price });
    });

    // Data Transformation - sorting
    parsedData = this.sortObjectsByDate(parsedData);
    return parsedData;
}

/* 
    Get time series key from alpha vantage response object
*/
export function getTimeSeriesKey(keys) {

    const DESIRED_RESP_KEYS = ['Time Series (Daily)', 'Weekly Time Series', 'Monthly Time Series'];
    const possibleKeys = DESIRED_RESP_KEYS.filter(e => keys.includes(e));

    if (possibleKeys.length === 1) {
        return possibleKeys[0];
    } else {
        throw new Error(`Time Series Key was not among the keys from the response: ${keys}`);
    }
}

/* 
    Sort time series data objects into oldest to newest. {date: ..., price:...}
*/
export function sortObjectsByDate(data) {

    var newData = data.slice();

    newData.sort((a, b) => {
        return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    });

    return newData;
}

/* 
    Normalize array of numbers between two values
*/
export function normalize(measurementArr) {

    const rMin = _.min(measurementArr);
    const rMax = _.max(measurementArr);
    const tMin = PARAMS.normalizeScale.min; // 0
    const tMax = PARAMS.normalizeScale.max; // 100

    const normalized = measurementArr.map(el => {
        return (el - rMin) / (rMax - rMin) * (tMax - tMin) + tMin;
    });

    return normalized;
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
    Calculate the number of days between two given dates.
*/
export function daysApart(dateOne, dateTwo) {
    return Math.abs(Math.round((dateTwo - dateOne) / (1000 * 60 * 60 * 24)));
}

