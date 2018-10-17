

import { observable, action } from 'mobx';
import MockPatterns from '../constants/MockPatterns';
import _ from 'lodash';

import StockPatternApi from '../../../api/StockPatternApi';
import * as Preprocess from '../Helper/Preprocess';

class PatternsStore {

    @observable definedPatterns = [];   // Predefined patterns
    @observable sampledPatterns = [];   // Labelled patterns

    /* For storing statistics */
    @observable patternCounts = {};     // Statistic stores

    @observable small = 0;
    @observable med = 0;
    @observable large = 0;

    /* For adjusting sampling types */
    @observable maxOffset = 6;
    @observable incrementOffset = 2;


    @action
    reliabilityCheck = () => {
        // go through test set with solutions
        // if date of sample is close to solution => correct
        // number predictions made
        // 
    }
    @action
    setup = () => {

        // Get defined patterns from static file
        this.definedPatterns = MockPatterns.defined.slice();

        this.definedPatterns.forEach(pattern => {
            pattern.parsedValues = Preprocess.normalize(pattern.rawValues);
            return pattern;
        });

        this.sampledPatterns = [];
        this.patternCounts = [];
        this.periodCounts = [];

        // Get Sampled Patterns
        StockPatternApi.readAll().then(res => {

            this.sampledPatterns = res.data.slice();

            // Create patterns if empty
            if (this.sampledPatterns.length <= 0) {
                this.createPatterns();
            }

            this.computeStats();

        }).catch(err => console.log(err));
    }


    /* Creates similar patterns for a given pattern. */
    createPatterns = () => {
        var promises = [];

        this.definedPatterns.forEach(pattern => {
            promises.concat(this.createPatternSlanted(pattern));
        });

        return promises;
    }


    createPatternSlanted = (pattern) => {

        var promises = [];

        // slant pattern up and down
        for (var offset = 0; offset <= this.maxOffset; offset += this.incrementOffset) {

            var dupUp = JSON.parse(JSON.stringify(pattern));
            var dupDown = JSON.parse(JSON.stringify(pattern));

            // Setting raw values to new offsetted prices
            dupUp.rawValues = dupUp.rawValues.map((value, index) => {
                return value + index * offset;
            });
            dupDown.rawValues = dupDown.rawValues.map((value, index) => {
                return value + (dupDown.rawValues.length - 1 - index) * offset;
            });

            if (offset === 6) {
                console.log(dupUp.rawValues);
            }

            // Setting normalized price values
            dupUp.parsedValues = Preprocess.normalize(dupUp.rawValues);
            dupDown.parsedValues = Preprocess.normalize(dupDown.rawValues);

            // Create template patterns
            var promiseUp = StockPatternApi.create(dupUp);
            var promiseDown = StockPatternApi.create(dupDown);

            promiseUp.then(res => console.log(res)).catch(err => console.log(err));
            promiseDown.then(res => console.log(res)).catch(err => console.log(err));
            promises.push([promiseUp, promiseDown]);
        }

        return promises;
    }

    computeDayCount = () => { }

    computeStats = () => {

        this.small = 0;
        this.med = 0;
        this.large = 0;
        this.patternCounts = {};

        this.definedPatterns.forEach(pattern => {
            this.patternCounts[pattern.name] = 0;
        });

        var keys = Object.keys(this.patternCounts);

        this.sampledPatterns.forEach(pattern => {

            // Dont compute training set, just test set
            if (pattern.period === undefined) {
                console.log("error in period");
                return;
            }

            // update pattern count stats
            keys.forEach(key => {
                if (pattern.name === key) {
                    this.patternCounts.key += 1;
                }
            })

            // update period count stats
            var periodWord = pattern.period.split(' ');
            var periodType = periodWord[1];

            switch (periodType) {
                case 'DAILY':
                    this.small += 1;
                    break;
                case 'WEEKLY':
                    this.med += 1;
                    break;
                case 'MONTHLY':
                    this.large += 1;
                    break;
                default:
                    console.log("NONE OF THE PERIODS FOUND");
                    break;
            }
        });
    }
}

export default new PatternsStore();