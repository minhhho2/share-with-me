
import DTW from 'dtw';
import * as utils from './utils';


/* 
    Calculates distance between two time series data. 
    Data is in the form of array of numbers.
*/

export function distance(timeSeriesSample, timeSeriesLabeled) {
    
    var dtw = new DTW({ distanceMetric: 'squaredEuclidean' });

    var newSample = utils.normalize(timeSeriesSample);
    var newLabeled = utils.normalize(timeSeriesLabeled);

    return dtw.compute(newSample, newLabeled);
}



/*





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


 