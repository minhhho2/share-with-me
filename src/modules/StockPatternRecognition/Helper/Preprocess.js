import _ from 'lodash';
import PolynomialRegression from 'ml-regression-polynomial';
import * as Utils from './Utils';
import PARAMS from '../constants/Params';

/* 
    Normalize feature vector which is array of numeric values of stock prices.
    Normalizes for price and period.
*/
export function normalize(series) {

    var parsedTimeSeries = series.slice();

    // Normalize height (prices)
    parsedTimeSeries = this.normalizePrice(parsedTimeSeries);

    // Normalize length (period)
    parsedTimeSeries = this.normalizePeriod(parsedTimeSeries);

    return parsedTimeSeries;
}

/* 
    Normalize raw time series of stock price for its price
*/
export function normalizePrice(series) {

    const rMin = _.min(series);
    const rMax = _.max(series);
    const tMin = PARAMS.normalizeScale.min; // 0
    const tMax = PARAMS.normalizeScale.max; // 100

    const normalized = series.map(el => {
        return (el - rMin) / (rMax - rMin) * (tMax - tMin) + tMin;
    });

    return normalized;
}

/* 
    Normalize raw time series of stock price for its period
*/
export function normalizePeriod(series) {
    
    const regression = new PolynomialRegression(_.range(series.length), series, series.length);

    var newLength = PARAMS.resampling.length;
    var resampledSeries = Array(newLength);

    var xDistance = 1.0 * series.length / newLength; 

    for (var i = 0; i < newLength; i += 1) { // 
        resampledSeries[i] = regression.predict(i * xDistance);
    }

    // fix last one always broken
    resampledSeries[newLength - 1] = regression.predict(Math.floor((newLength - 1) * xDistance));

    return resampledSeries;
}