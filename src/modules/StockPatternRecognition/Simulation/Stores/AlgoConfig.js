const PARAMETERS = {
    distanceThreshold: 7,
    maxNeighbours: 10,
    dtwDistanceMetric: { distanceMetric: 'euclidean' }, //'manhattan' | 'euclidean' | 'squaredEuclidean'.
    minDaysApart: 4
}

module.exports = PARAMETERS;


/* 

paramsKNN = {
    distanceMetric:
    distanceThreshold:
    kNeighbors:
    minDaysApart:
}




const CONSTANTS = {

    definedPatterns: [
        {
            name: 'Head and Shoulder',
            values: [0, 5, 0, 10, 0, 5, 0]
        },
        {
            name: 'Cup',
            values: [10, 4, 2, 0, 2, 4, 10]
        }
    ],
    periods: [7, 14, 30],
    costThreshold: 30

}

module.exports = CONSTANTS;

*/

/* 
    For incremntal learning to work well we had to set threshold -> did not work well with DTW because bigger lengths pattern = higher distance
    so we had to normlaize it for length
    Normalizing distance by MAX LENGTH with distanceThreshold 7 = filter alot of bad ones
    Some samples still unrecognizable

*/

