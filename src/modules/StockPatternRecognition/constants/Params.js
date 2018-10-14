const PARAMS = {
    normalizeScale: {
        min: 0,
        max: 200
    },
    model: {
        maxDTWDistance: 350,
        dtwDistanceMetric: { distanceMetric: 'euclidean' }, 
       // minDaysApart: 4
    },
    resampling: {
        length: 33
    }
}

module.exports = PARAMS;


//'manhattan' | 'euclidean' | 'squaredEuclidean'.