import PARAMS from '../constants/Params';
import _ from 'lodash';
import { Coordinate } from '../../../models/Coordinate';

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


export function daysApart(dateOne, dateTwo) {
    return Math.abs(Math.round((dateTwo - dateOne) / (1000 * 60 * 60 * 24)));
}