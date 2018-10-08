

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

        this.matches = [];
        this.period = 16;
        this.windowPos = 0;

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
        this.peirod = 16;
    }

    @action
    setCurrentSampleValues = (values) => {
        this.currentSampleValues = values;
    }

    /*  
        kNN with threshold
        Incremental batch learning with very low threshold

    */
    classifySample = (sample) => {

        const { symbol } = InputStore.input;
        const { data } = TimeSeriesStore;

        var neighbors = [];

        // Calculate distance for all neighbors
        this.patterns.forEach(pattern => {
            var distance = processing.distance(sample.values, pattern.values);
            var normalizedSample = utils.normalize(sample.values);


            const newStockPattern = StockPattern(pattern.name, distance,
                normalizedSample, data[sample.index].date, this.period, symbol);

            neighbors.push(newStockPattern);
        });

        neighbors.sort((a, b) => {
            return a.cost - b.cost;
        });


        if (neighbors.length >= 1) {

            var lowestMatch = neighbors[0];

            // check if below threshold
            if (lowestMatch.cost <= algoParameters.distanceThreshold) {
                console.log(`1st and lower cost: ${neighbors[0].cost} and last and highest cost ${neighbors[neighbors.length - 1].cost}`);

                // can compare to last
                if (this.matches.length >= 1) {
                    const lastMatch = this.matches[this.matches.length - 1];

                    const daysApart = this.daysApart(lastMatch.date, lowestMatch.date);
                    if (daysApart <= 3) {

                        console.log(`Days apart is ${daysApart} so replacing last`);

                        // compare cost
                        lowestMatch = lastMatch.cost < lowestMatch.cost ? lastMatch : lowestMatch;
                        this.matches[this.matches.length - 1] = lowestMatch;
                    } else {
                        console.log("adding match");
                        // for if its not in between days
                        this.matches.push(lowestMatch);
                    }
                } else {
                    // for first addition
                    this.matches.push(lowestMatch);
                }
            }
        }
    }


    // Get last match if it exists
    // compare if below 3 days apart
    // get smallest match


    daysApart = (dateOne, dateTwo) => {
        return Math.abs(Math.round((dateTwo - dateOne) / (1000 * 60 * 60 * 24)));
    }

}

export default new SamplingStore();