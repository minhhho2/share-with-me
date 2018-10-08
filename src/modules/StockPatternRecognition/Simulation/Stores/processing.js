
import DTW from 'dtw';
import * as utils from './utils';


/* 
    Calculates distance between two time series data. 
    Data is in the form of array of numbers.
*/

export function distance(timeSeriesSample, timeSeriesLabeled) {
    var dtw = new DTW({ distanceMetric: 'squaredEuclidean' });
    var normalizedSample = utils.normalize(timeSeriesSample, timeSeriesLabeled);
    var distance = dtw.compute(normalizedSample, timeSeriesLabeled);
    return distance;
}

/*


classify = (sample, labeledData, k) => {

    iterate

}

useClassifiedData = () => {}


weightedCost = (objA) => {
    doo math

    return new object
}

*/

/**
 *  KNN Classifier, given an integer k and a new sample, we select the k entries from the data set that are
 *  closest to the new sample. We find the most common label of these entries and assign it to the new
 *  sample. 
 * 
 *  Note: kNN does not learn any model - it predicts the label by calculating similarity betwee ninput sample and each instance
 */

 /*
insertLabeledSampleToDataset = (sample) => {

}



classify = (sample, labeledData, maxNeighbours) => {

    var allNeighbours = [];

    // Calculate cost of all labeled data points and add to storage
    labeledData.forEach(data => {
        
        const distance = this.distance(sample, data);
        allNeighbours.push({
            neighbour: data,
            distance: distance
        });

    });

    // Sort allNeigbours based on distance
    allNeighbours.sort((a, b) => {
        return a.distance - b.distance;
    });

    // get k Neighbours
    var kNN = allNeighbours.slice(0, maxNeighbours);

    // TODO: Get majority label from kNN
    const label = 'some label';

    return label;
}
*/