
import DTW from 'dtw';
import PARAMS from '../constants/Params';
import * as Resampling from '../Helper/Resampling';


import { StockPattern } from '../../../models/StockPattern';

/* 
    Calculates distance between two time series data. 
    Data is in the form of array of numbers.
*/
export function distance(timeSeriesSample, timeSeriesLabeled) {

    var dtw = new DTW(PARAMS.model.dtwDistanceMetric);
    var distance = dtw.compute(timeSeriesSample, timeSeriesLabeled);

    return distance;
}

export function predict(dataset, sample) {

    var neighbors = [];

    // Calculate distances for neighbours
    dataset.forEach(pattern => {

        // Normalize sample and datapoint
        var resampledSample = Resampling.resample(sample.values);
        var resampledPattern = Resampling.resample(pattern.values);

        var distance = this.distance(resampledSample, resampledPattern);

        // Store calculated neighbor
        const newStockPattern = StockPattern(
            pattern.name, distance, resampledSample,
            sample.date, sample.period, sample.symbol
        );

        neighbors.push(newStockPattern);
    });

    neighbors.sort((a, b) => {
        return a.cost - b.cost;
    });
    

    // Get k nearest neighbor
    var closestNeighbor = neighbors[0];

    return closestNeighbor;
}

export function confusionMatrix() {

}

/* 







// No normalize time scale
export function distance(timeSeriesSample, timeSeriesLabeled) {
    var dtw = new DTW(AlgoConfig.dtwDistanceMetric);
    var distance = dtw.compute(utils.normalize(timeSeriesSample), utils.normalize(timeSeriesLabeled));
    return distance;
}

// normalize time scale by length
xport function distance(timeSeriesSample, timeSeriesLabeled) {

    var dtw = new DTW(AlgoConfig.dtwDistanceMetric);
    var distance = dtw.compute(utils.normalize(timeSeriesSample), utils.normalize(timeSeriesLabeled));
    var maxLength = timeSeriesLabeled.length > timeSeriesSample.length ? timeSeriesLabeled.length: timeSeriesSample.length

    return distance/maxLength;
}
*/