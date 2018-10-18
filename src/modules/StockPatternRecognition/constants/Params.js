const PARAMS = {
    normalizeScale: {
        min: 0,
        max: 200
    },
    model: {
        maxDTWDistance: 350,
        dtwDistanceMetric: { distanceMetric: 'euclidean' }, 
    },
    resampling: {
        length: 33
    }
}

module.exports = PARAMS;


//'manhattan' | 'euclidean' | 'squaredEuclidean'.