

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

    @observable currentSampleValues = null;

    @observable matches = [];   // sampled matches from current data ~ NOT from DB/Dataset
    @observable patterns = [];  // previous matches from DB/Dataset

    @action
    setup = () => {

        this.matches = [];
        this.period = 16;
        this.windowPos = 0;
        this.currentSampleValues = Array.apply(null, {length: this.period }).map(Function.call, Number);

        // Get Sampled Patterns
        StockPatternApi.readAll()
            .then(res => { this.patterns = res.data.slice(); })
            .catch(err => { console.log(err) });
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
        https://www.analyticsvidhya.com/blog/2018/03/introduction-k-neighbours-algorithm-clustering/

    */

    classifySample = (sample) => {

        var neighbors = [];
        this.patterns.forEach(pattern => {
            console.log(`comparing @ ${sample.index} against ${pattern.name}`)
            
            var distance = processing.distance(sample.values, pattern.values);
            var normalizedSample = utils.normalize(sample.values);
            

            const newStockPattern = StockPattern(pattern.name, distance,
                normalizedSample, TimeSeriesStore.data[sample.index].date,
                this.period, InputStore.input.symbol);

            neighbors.push(newStockPattern);
        });

        // Get top k neighbours
        neighbors.sort((a, b) => {
            return a.cost - b.cost;
        });


        if (neighbors.length >= 1) {

            var lowestMatch = neighbors[0];
            //console.log('lowest cost ' + neighbors[0].cost);

            // check if below threshold
            if (lowestMatch.cost <= algoParameters.distanceThreshold) {

                // can compare to last
                if (this.matches.length >= 1) {
                    const lastMatch = this.matches[this.matches.length - 1];

                    const daysApart = this.daysApart(lastMatch.date, lowestMatch.date);
                    if (daysApart <= algoParameters.minDaysApart) {


                        // compare cost
                        lowestMatch = lastMatch.cost < lowestMatch.cost ? lastMatch : lowestMatch;
                        this.matches[this.matches.length - 1] = lowestMatch;
                    } else {
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