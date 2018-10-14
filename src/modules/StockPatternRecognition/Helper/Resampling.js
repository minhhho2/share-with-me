//import PARAMS from './Params';

import _ from 'lodash';
import PolynomialRegression from 'ml-regression-polynomial';
import * as Utils from './Utils';
import PARAMS from '../constants/Params';


export function resample(series) {
    
    const regression = new PolynomialRegression(_.range(series.length), Utils.normalize(series), series.length);

    var newLength = PARAMS.resampling.length;
    var resampledSeries = Array(newLength);

    var xDistance = 1.0 * series.length / newLength; 

    for (var i = 0; i < newLength; i += 1) { // 
        resampledSeries[i] = regression.predict(i * xDistance);
    }

    // fix last one always broken
    resampledSeries[newLength - 1] = regression.predict(Math.floor((newLength - 1) * xDistance));

    return resampledSeries;
}