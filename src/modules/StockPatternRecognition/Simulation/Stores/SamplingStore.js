

import { observable, action } from 'mobx';
import _ from 'lodash';

import * as Classifier from '../../Helper/Classifier';
import * as Utils from '../../Helper/Utils';


import PARAMS from '../../constants/Params';

import StockPatternApi from '../../../../api/StockPatternApi';

/*
import * as Resampling from '../../Helper/Resampling';
import TimeSeriesStore from './TimeSeriesStore';
import InputStore from './InputStore';
import algoParameters from './AlgoConfig';
import { StockPattern } from '../../../../models/StockPattern';
*/

class SamplingStore {

    @observable windowPos = null;
    @observable intervalId = null;
    @observable period = null;
    @observable symbol = null;

    @observable currentSampleValues = null;

    @observable matches = [];   // sampled matches from current data ~ NOT from DB/Dataset
    @observable patterns = [];  // previous matches from DB/Dataset
    @observable minDaysApart = 0;

    @action
    setup = () => {

        // TODO: CHECK MODEL PARAMS like k >= NUM PATTERNS

        this.matches = [];
        this.period = 16;
        this.minDaysApart = parseInt(this.peirod / 10.0 * 2.0);

        this.windowPos = 0;
        this.currentSampleValues = Array.apply(null, { length: this.period }).map(Function.call, Number);

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

    classifySample = (sample) => {
        // Classify sample
        var closestNeighbor = Classifier.predict(this.patterns, sample);

        // Add if only if it passes conditions
        this.insertMatch(closestNeighbor);
    }

    /* 
        Inserts a match if it passes all conditions
    */
    insertMatch = (closestNeighbor) => {

        // Add sample as match if below threshold
        if (closestNeighbor.cost <= PARAMS.model.maxDTWDistance) {

            // Delete last match if close dates, is higher distance
            if (this.matches.length >= 1) {
                const lastMatch = this.matches[this.matches.length - 1];

                const isClose = Utils.daysApart(lastMatch.date, closestNeighbor.date) <= this.minDaysApart; //PARAMS.model.minDaysApart;
                const isClosestNeighborLowerDistance = closestNeighbor.cost < lastMatch.cost;
                
                // Remove last one as its the same
                if (isClose && isClosestNeighborLowerDistance) {
                    var popped = this.matches.pop();
                
                // Exit adding as its the same date but worst
                } else if (isClose && !isClosestNeighborLowerDistance){ 
                    return;
                }
            }

            // Add matche
            this.matches.push(closestNeighbor);
        }
    }
}

export default new SamplingStore();



/* 


    classifySample = (sample) => {

        var neighbors = [];
        this.patterns.forEach(pattern => {

            var resampledPattern = Resampling.resample(pattern.values);
            var resampledSample = Resampling.resample(sample.values);

            var distance = Classifier.distance(resampledSample, resampledPattern);         

            const newStockPattern = StockPattern(pattern.name, distance,
                resampledSample, TimeSeriesStore.data[sample.index].date,
                this.period, InputStore.input.symbol);

            neighbors.push(newStockPattern);
        });

        // Get top k neighbours
        neighbors.sort((a, b) => {
            return a.cost - b.cost;
        });


        if (neighbors.length >= 1) {

            var lowestMatch = neighbors[0];
            console.log('lowest cost ' + neighbors[0].cost);

            // check if below threshold
            if (lowestMatch.cost <= PARAMS.model.maxDTWDistance) {

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



*/