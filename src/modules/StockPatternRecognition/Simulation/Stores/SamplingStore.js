

import { observable, action } from 'mobx';
import _ from 'lodash';

import * as Classifier from '../../Helper/Classifier';
import * as Utils from '../../Helper/Utils';


import PARAMS from '../../constants/Params';

import StockPatternApi from '../../../../api/StockPatternApi';
import InputStore from './InputStore';

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

    @observable timeseriesLengthsToCheck = [];

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

    /* 
        Stops timer, resets window position, resets period
    */
    @action
    clear = () => {
        clearInterval(this.intervalId);
        this.windowPos = 0;
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
                
                console.log(Utils.daysApart(lastMatch.date, closestNeighbor.date));

                const isClose = Utils.daysApart(lastMatch.date, closestNeighbor.date) <= this.minDaysApart; //PARAMS.model.minDaysApart;
                const isClosestNeighborLowerDistance = closestNeighbor.cost < lastMatch.cost;
                const isSameClass = closestNeighbor.name === lastMatch.name;

                // Remove last one as its the same
                if (isClose && isClosestNeighborLowerDistance && isSameClass) {
                    this.matches.pop();

                    // Exit adding as its the same date but worst
                } else if (isClose && isSameClass && !isClosestNeighborLowerDistance) {
                    return;
                }
            }

            // Add matche
            this.matches.push(closestNeighbor);
        }
    }

    setMinDaysApart = (period) => {
        var multiplier = 0.10 * 3;
        var days = 0;

        switch (InputStore.input.period) {
            case 'TIME_SERIES_DAILY':
                days = period * multiplier;
                break;
            case 'TIME_SERIES_WEEKLY':
                days = period * 7 * multiplier;
                break;
            case 'TIME_SERIES_MONTHLY':
                days = period * 4 * 7 * multiplier;
                break;
            default:
                console.log("Setting Min Days Apart: incorrect time series provided");
                break;
        }
        
        this.minDaysApart = Math.ceil(days);
        console.log(`Min days apart is ${days} for period ${this.period} for ${InputStore.input.period}`);

    }

    getPeriodGroups = (timeseriesPeriod) => {
        const daily = [10, 15, 20, 25, 30, 35, 40] // 2 week 3 week 4 week 5 week 6 week 7 week 8 week
        const weekly = [12, 16, 20, 24, 28, 32, 36, 40, 48] // 3 month, 4 month, 5 month, 6 month, 7 month. 8 month, 9 month, 10 month, 11 month, 12 month
        const monthly = [12, 18, 24, 30, 36] // 1 year, 1.5 year, 2 year, 2.5 year, 3 year

        switch (timeseriesPeriod) {
            case 'TIME_SERIES_DAILY':
                this.timeseriesLengthsToCheck = daily.slice();
                break
            case 'TIME_SERIES_WEEKLY':
                this.timeseriesLengthsToCheck = weekly.slice();
                break
            case 'TIME_SERIES_MONTHLY':
                this.timeseriesLengthsToCheck = monthly.slice();
                break;
            default:
                console.log('RECEIVED INCORRECT TIME SERIES KEY');
                break;
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