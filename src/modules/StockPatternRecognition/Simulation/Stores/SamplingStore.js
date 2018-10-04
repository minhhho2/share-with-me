

import { observable, action } from 'mobx';
import DTW from 'dtw';
import _ from 'lodash';
import * as utils from '../Stores/utils';
import MockPatterns from '../../constants/MockPatterns';

class SamplingStore {

    @observable windowPos = null;
    @observable intervalId = null;
    @observable period = null;

    @observable currentSampleValues = [0, 1, 2, 3, 4, 5, 6, 7, 7];

    @observable matches = [];   // sampled matches from current data ~ NOT from DB/Dataset
    @observable patterns = [];  // previous matches from DB/Dataset


    @action
    setup = () => {
        this.patterns = MockPatterns.defined.slice(); // REMOVE AND GET PATTERNS FROM DB
    }

    @action
    clear = () => {
        clearInterval(this.intervalId);
    }

    @action
    setCurrentSampleValues = (values) => {
        this.currentSampleValues = values;
    }

    classifySample = (sampleValues) => {
        var dtw = new DTW({ distanceMetric: 'squaredEuclidean' });
        const THRESSHOLD = 25;
        
        var samplePatternValues = sampleValues;
        
        this.patterns.forEach(pattern => {
            // normalize -> scale
            var normalizedSampleValues= utils.normalize(samplePatternValues, pattern.values);
            var cost = dtw.compute(normalizedSampleValues, pattern.values);

            if (cost <= THRESSHOLD) {
                console.log("Matched sample with " + pattern.name + ' @ ' + cost);
                
                this.matches.push({
                    name: pattern.name,
                    cost: cost,
                    values: normalizedSampleValues
                });
            }
        });

    }

}

export default new SamplingStore();