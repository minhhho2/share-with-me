

import { observable, action } from 'mobx';
import DTW from 'dtw';
import _ from 'lodash';

import * as utils from '../Stores/utils';
import * as processing from '../Stores/processing';


import StockPatternApi from '../../../../api/StockPatternApi';
import TimeSeriesStore from './TimeSeriesStore';
import InputStore from './InputStore';

import algoParameters from './AlgoConfig';


import { StockPattern } from '../../../../models/StockPattern';

class SamplingStore {

    @observable windowPos = null;
    @observable intervalId = null;
    @observable period = 14;
    @observable symbol = null;

    @observable currentSampleValues = [0, 1, 2, 3, 4, 5, 6, 7, 7];

    @observable matches = [];   // sampled matches from current data ~ NOT from DB/Dataset
    @observable patterns = [];  // previous matches from DB/Dataset


    @action
    setup = () => {
        this.period = 30;

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

        const { symbol } = InputStore.input;

        var multipleMatches = [];

        // Calculate distance between each neighbor
        this.patterns.forEach(pattern => {

            var distance = processing.distance(sampleValues, pattern.values);

            var normalizedSampleValues = utils.normalize(sampleValues, pattern.values);

            if (distance <= algoParameters.distanceThreshold) {
                console.log("Matched sample with " + pattern.name + ' @ ' + distance);

                const newStockPattern = StockPattern(
                    pattern.name, distance, normalizedSampleValues,
                    TimeSeriesStore.data[index].date, this.period, symbol
                );

                multipleMatches.push(newStockPattern);
            }
        });

        multipleMatches.sort((a, b) => {
            return a.cost - b.cost;
        });

        if (multipleMatches.length >= 1) {
            console.log(`1st and lower cost: ${multipleMatches[0].cost} and last and highest cost ${multipleMatches[multipleMatches.length - 1].cost}`);

            const chosenMatch = multipleMatches[0];
            this.matches.push(chosenMatch);
        }

        // Get last match if it exists
        // compare if below 3 days apart
        // get smallest match
    }

}

export default new SamplingStore();