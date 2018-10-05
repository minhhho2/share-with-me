

import { observable, action } from 'mobx';
import DTW from 'dtw';
import _ from 'lodash';

import * as utils from '../Stores/utils';
import StockPatternApi from '../../../../api/StockPatternApi';
import TimeSeriesStore from './TimeSeriesStore';
import InputStore from './InputStore';


class SamplingStore {

    @observable windowPos = null;
    @observable intervalId = null;
    @observable period = null;
    @observable symbol = null;

    @observable currentSampleValues = [0, 1, 2, 3, 4, 5, 6, 7, 7];

    @observable matches = [];   // sampled matches from current data ~ NOT from DB/Dataset
    @observable patterns = [];  // previous matches from DB/Dataset


    @action
    setup = () => {

        // Get Sampled Patterns
        StockPatternApi.readAll()
            .then(res => { this.patterns = res.data.slice(); })
            .catch(err => { console.log(err) });

        if (this.patterns.length <= 0) {
            console.log("Cant compare if theres no patterns to compare to");
        }
    }

    @action
    clear = () => {
        clearInterval(this.intervalId);
    }

    @action
    setCurrentSampleValues = (values) => {
        this.currentSampleValues = values;
    }

    classifySample = (index, sampleValues) => {

        var dtw = new DTW({ distanceMetric: 'squaredEuclidean' });
        const THRESSHOLD = 25;

        var samplePatternValues = sampleValues;

        var multipleMatches = [];

        this.patterns.forEach(pattern => {
            // normalize -> scale
            var normalizedSampleValues = utils.normalize(samplePatternValues, pattern.values);
            var cost = dtw.compute(normalizedSampleValues, pattern.values);

            if (cost <= THRESSHOLD) {
                console.log("Matched sample with " + pattern.name + ' @ ' + cost);

                multipleMatches.push({
                    name: pattern.name,
                    cost: cost,
                    values: normalizedSampleValues,
                    date: TimeSeriesStore.data[index].date,
                    period: this.period,
                    symbol: this.symbol
                });
            }
        });

        multipleMatches.sort((a, b) => {
            return a.cost - b.cost;
        });

        if (multipleMatches.length >= 1) {
            const chosenMatch = multipleMatches[0];
            this.matches.push(chosenMatch);
        }

        // Get last match if it exists
        // compare if below 3 days apart




        // get smallest match
    }
}

export default new SamplingStore();