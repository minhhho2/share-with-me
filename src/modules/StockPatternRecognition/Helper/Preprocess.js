import _ from 'lodash';
import PolynomialRegression from 'ml-regression-polynomial';
import PARAMS from '../constants/Params';

/* 
    Normalize feature vector which is array of numeric values of stock prices.
    Normalizes for price and period.
*/
export function normalize(series) {

    var parsedTimeSeries = series.slice();
    parsedTimeSeries = this.normalizePrice(parsedTimeSeries); // normalize height (price)
    parsedTimeSeries = this.normalizePeriod(parsedTimeSeries); // normalize length (period)

    return parsedTimeSeries;
}

/* 
    Normalize raw time series of stock price for its price
*/
export function normalizePrice(series) {

    const rMin = _.min(series);
    const rMax = _.max(series);
    const tMin = PARAMS.normalizeScale.min;
    const tMax = PARAMS.normalizeScale.max;

    const normalized = series.map(el => {
        return (el - rMin) / (rMax - rMin) * (tMax - tMin) + tMin;
    });

    return normalized;
}

/* 
    Normalize raw time series of stock price for its period
*/
export function normalizePeriod(series) {

    const regression = new PolynomialRegression(_.range(series.length), series, series.length - 2);

    const newLength = PARAMS.resampling.length;
    const xDistance = 1.0 * series.length / newLength;
    var resampledSeries = Array(newLength);

    for (var i = 0; i < newLength; i += 1) {
        resampledSeries[i] = this.predictY(regression, i * xDistance);
    }
    
    resampledSeries[newLength - 1] = this.predictY(regression, Math.floor((newLength - 1) * xDistance));

    return resampledSeries;
}


export function predictY(regression, x) {

    // Prone to negative and massive errors
    var y = regression.predict(x);

    // Check negative
    if (y <= PARAMS.normalizeScale.min) { // 0
        return PARAMS.normalizeScale.min;
    }
    if (y >= PARAMS.normalizeScale.max) { // 200
        return PARAMS.normalizeScale.max;
    }

    return y;
}