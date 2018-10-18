
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
/* 
    Cost / Loss / Error Function => calculates the differenc ebetween desired output and 
    approximation to it given the current values of the parameter.

    Checks for equality as output is binary
*/
export function objectiveFunction(predictions, testingset) {
    var numCorrect = 0;

    testingset.forEach(datapoint => {

        // find matching input time series for test set
        const match = predictions.find(samplepoint => {
            return this.compareFloatingArray(samplepoint.rawValues, datapoint.rawValues);;
        });

        if (match === undefined) {
            console.log("Did not find a match for a test point " + JSON.stringify(datapoint));
            alert('no match');
        }

        // check if same
        if(match.name === datapoint.name) {
            numCorrect += 1;
        }
    });

    // partition groups

    const results = {
        numCorrect: numCorrect,
        numTestPoints: testingset.length,
        accuracy: (1.0 * numCorrect / testingset.length)
    }
    
    return results;
}

/* 
    Check if two array of floating numbers (prices) is the same
*/
export function compareFloatingArray(arrOne, arrTwo) {

    var precision = 0.1;

    // Cant be same time series if different length
    if (arrOne.length != arrTwo.length) {
        console.log('not same length');
        return false;
    }

    // cant be same time series if different values
    for(var i = 0; i < arrOne.length; i++) {
        const diff = Math.abs(arrOne[i] - arrTwo[i]);
        if (diff >= precision) {
            return false;
        }
    }

    return true;    
}



