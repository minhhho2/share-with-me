

import { observable, action } from 'mobx';
import _ from 'lodash';

import * as Classifier from '../../Helper/Classifier';
import * as Utils from '../../Helper/Utils';
import PARAMS from '../../constants/Params';
import StockPatternApi from '../../../../api/StockPatternApi';
import InputStore from './InputStore';

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

        if (closestNeighbor.distance <= PARAMS.model.maxDTWDistance) { // Add in under threshold

            var abort = false;
            var exit = false;

            // Check the matches if the same pattern has been found with similar period
            for (var i = 0; i < this.matches.length && !abort; i++) {
                const prevMatch = this.matches[i];

                // Get masks
                const isClose = Utils.daysApart(prevMatch.date, closestNeighbor.date) <= this.minDaysApart;
                const isClosestNeighborLowerDistance = closestNeighbor.distance < prevMatch.distance;
                const isSameClass = closestNeighbor.name === prevMatch.name;

                // Found labelled time series that has similar dates and same pattern
                if (isClose && isSameClass) {

                    // New observation is better so remove previous match
                    if (isClosestNeighborLowerDistance) {
                        abort = true;
                        this.matches.splice(i, 1);

                    } else {
                        console.log("close dates same clase but worst cost so dont add");
                        abort = true;
                        exit = true;
                    }
                }
            }
            if (exit) { return; }

            console.log(closestNeighbor.rawValues);
            // Add match as its not close dates and is under threshold
            this.matches.push(closestNeighbor);
        }

    }
    //console.log(`Removing for ${prevMatch.date.toDateString()} with distance ${prevMatch.distance} and pattern ${prevMatch.name}`);
    //console.log(`Replacing with ${closestNeighbor.date.toDateString()} with distance ${closestNeighbor.distance} and pattern ${closestNeighbor.name}`);
    //console.log(`Days apart is ${Utils.daysApart(prevMatch.date, closestNeighbor.date)} with min ${this.minDaysApart}`);

    setMinDaysApart = (period) => {
        var multiplier = 0.10 * 3;
        var days = 0;

        switch (InputStore.input.period) {
            case 'DAILY':
                days = period * multiplier;
                break;
            case 'WEEKLY':
                days = period * 7 * multiplier;
                break;
            case 'MONTHLY':
                days = period * 4 * 7 * multiplier;
                break;
            default:
                console.log("Setting Min Days Apart: incorrect time series provided");
                break;
        }

        this.minDaysApart = Math.ceil(days);
    }

    getPeriodGroups = (timeseriesPeriod) => {
        const daily = [5, 10, 15, 20, 25, 30, 35, 40];             // 2 week 3 week 4 week 5 week 6 week 7 week 8 week
        const weekly = [12, 16, 20, 24, 28, 32, 36, 40, 44];    // 3 month, 4 month, 5 month, 6 month, 7 month. 8 month, 9 month, 10 month, 11 month, 12 month
        const monthly = [12, 18, 24, 30, 36];                   // 1 year, 1.5 year, 2 year, 2.5 year, 3 year

        switch (timeseriesPeriod) {
            case 'DAILY':
                this.timeseriesLengthsToCheck = daily.slice();
                break
            case 'WEEKLY':
                this.timeseriesLengthsToCheck = weekly.slice();
                break
            case 'MONTHLY':
                this.timeseriesLengthsToCheck = monthly.slice();
                break;
            default:
                console.log('RECEIVED INCORRECT TIME SERIES KEY');
                break;
        }
    }
}

export default new SamplingStore();


