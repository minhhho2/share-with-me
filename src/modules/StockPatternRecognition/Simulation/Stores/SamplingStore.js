

import { observable, action } from 'mobx';
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
    @observable period = null;
    @observable symbol = null;

    @observable currentSampleValues = [0, 1, 2, 3, 4, 5, 6, 7, 7];

    @observable matches = [];   // sampled matches from current data ~ NOT from DB/Dataset
    @observable patterns = [];  // previous matches from DB/Dataset


    @action
    setup = () => {
        this.clear();

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
        this.windowPos = 0;
        this.period = 14;
    }

    @action
    setCurrentSampleValues = (values) => {
        this.currentSampleValues = values;
    }

    classifySample = (index, sampleValues) => {

        const { symbol } = InputStore.input;

        var sampleMatches = [];

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

                sampleMatches.push(newStockPattern);
            }
        });

        sampleMatches.sort((a, b) => {
            return a.cost - b.cost;
        });

        if (sampleMatches.length >= 1) {
            console.log(`1st and lower cost: ${sampleMatches[0].cost} and last and highest cost ${sampleMatches[sampleMatches.length - 1].cost}`);

            const chosenMatch = sampleMatches[0];
            this.matches.push(chosenMatch);
        }

        // Get last match if it exists
        // compare if below 3 days apart
        // get smallest match
    }

}

export default new SamplingStore();