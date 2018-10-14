const PARAMETERS = {
    distanceThreshold: 7,
    maxNeighbours: 10,
    dtwDistanceMetric: { distanceMetric: 'euclidean' }, //'manhattan' | 'euclidean' | 'squaredEuclidean'.
    minDaysApart: 4
}

module.exports = PARAMETERS;


/* 

    For incremntal learning to work well we had to set threshold -> did not work well with DTW because bigger lengths pattern = higher distance
    so we had to normlaize it for length
    Normalizing distance by MAX LENGTH with distanceThreshold 7 = filter alot of bad ones
    Some samples still unrecognizable

*/

