
import DTW from 'dtw';
import PARAMS from '../constants/Params';
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

        var distance = this.distance(sample.parsedValues, pattern.parsedValues);

        const newStockPattern = {
            name: pattern.name,
            distance: distance,
            rawValues: sample.rawValues,   // prices
            parsedValues: sample.parsedValues,
            matchedPatternValues: pattern.parsedValues,
            date: sample.date,
            period: sample.period,
            symbol: sample.symbol
        }
   
        neighbors.push(newStockPattern);
    });

    // Select best neighbors
    neighbors.sort((a, b) => {
        return a.distance - b.distance;
    });
    const closestNeighbor = neighbors[0];

    return closestNeighbor;
}