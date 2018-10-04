

import { observable, action } from 'mobx';
import DTW from 'dtw';
import _ from 'lodash';
import * as utils from '../Stores/utils';

import MockPatterns from '../../constants/MockPatterns';

class SamplingStore {

    @observable windowPos = null;
    @observable intervalId = null;
    @observable period = 14;



    @observable currentSampleValues = [0, 1, 2, 3, 4, 5, 6, 7, 7];

    // sampled patterns from current data
    @observable matches = [];   // should be same structure as in mockpattern

    // identified patterns from db
    @observable patterns = [];


    @action
    setup = () => {
        this.patterns = MockPatterns.defined.slice(); // REMOVE AND GET PATTERNS FROM DB
    }

    @action
    clear = () => {
        this.windowPos = 0;
        clearInterval(this.intervalId);
    }

    @action
    setCurrentSampleValues = (values) => {
        this.currentSampleValues = values;
    }

    classifySample = (sampleValues) => {

        const THRESSHOLD = 50;
        var samplePatternValues = sampleValues;


        this.patterns.forEach(pattern => {
            // scale to pattenr range
            const normalize1 = utils.normalize(samplePatternValues, pattern.values);

            console.log(normalize1 + '\n' + pattern.values);

            var dtw = new DTW({ distanceMetric: 'squaredEuclidean' });
            var cost = dtw.compute(normalize1, pattern.values);
            console.log('Cost: ' + cost);

            if (cost <= THRESSHOLD) {
                clearInterval(this.intervalId);
                console.log(pattern.name);
                this.addSampleToMatches(sampleValues);
            }
        });

    }

    @action
    addSampleToMatches = (matchedSample) => {
        console.log("adding matched sample");
        this.matches.push(matchedSample);
    }

    normalize = (measurementArr, targetArr) => {

        const rMin = _.min(measurementArr);
        const rMax = _.max(measurementArr);
        const tMin = _.min(targetArr);
        const tMax = _.max(targetArr);

        const normalized = measurementArr.map(el => {
            return (parseInt((el - rMin)/(rMax - rMin) * (tMax - tMin) + tMin));
        });

        return normalized;
    }
}

export default new SamplingStore();