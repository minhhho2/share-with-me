
import DTW from 'dtw';
import * as utils from './utils';
import AlgoConfig from './AlgoConfig';

/* 
    Calculates distance between two time series data. 
    Data is in the form of array of numbers.
*/
export function distance(timeSeriesSample, timeSeriesLabeled) {

    var dtw = new DTW(AlgoConfig.dtwDistanceMetric);
    var distance = dtw.compute(utils.normalize(timeSeriesSample), utils.normalize(timeSeriesLabeled));
    
    var maxLength = timeSeriesLabeled.length > timeSeriesSample.length ? timeSeriesLabeled.length: timeSeriesSample.length
    console.log('distance before and after ' + distance + ' ; ' + distance/maxLength);

    distance = distance/maxLength

    return distance;
}

export function pruneClassOutliers() {

}
export function majorityVote(neighbors) {

}

export function confusionMatrix() {

}


// https://www.analyticsvidhya.com/blog/2018/03/introduction-k-neighbours-algorithm-clustering/
export function classify() {

    /*

    load dataset
    initialize value of k
    iterate 1 ... total training data points
        calcualte distance between sample andtraining data using a distance metric
    Sort asceding order based on distance
    get top k values from sorted array
    get most frequent class from this array
    return predicted class

*/
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


