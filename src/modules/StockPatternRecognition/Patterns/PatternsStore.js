

import { observable, action } from 'mobx';
import MockPatterns from '../constants/MockPatterns';
import _ from 'lodash';

import StockPatternApi from '../../../api/StockPatternApi';
import * as utils from '../Simulation/Stores/utils';
import * as Resampling from '../Helper/Resampling';

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

            dupUp.values = dupUp.values.map((value, index) => {
                return value + index * offset;
            });
            dupDown.values = dupDown.values.map((value, index) => {
                return value + (dupDown.values.length - 1 - index) * offset;
            });

            dupUp.name = pattern.name;
            dupDown.name = pattern.name;

            dupUp.values = Resampling.resample(dupUp.values);
            dupDown.values = Resampling.resample(dupDown.values);

            var promiseUp = StockPatternApi.create(dupUp);
            var promiseDown = StockPatternApi.create(dupDown);

            promiseUp.then(res => console.log(res)).catch(err => console.log(err));
            promiseDown.then(res => console.log(res)).catch(err => console.log(err));
            promises.push([promiseUp, promiseDown]);
        }

        return promises;
    }

    computeDayCount = () => {}

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
            var periodWord = pattern.period.split('|');
            var periodNumber = parseInt(periodWord[0]);
            var periodType = periodWord[1].split('_')[2];

            var dayCount = 0;
            switch(periodType) {
                case 'DAILY':
                    dayCount = periodNumber;
                    break;
                case 'WEEKLY':
                    dayCount = periodNumber * 7;
                    break;
                
                case 'MONTHLY':
                    dayCount = periodNumber * 4 * 7;
                    break;
                default:
                    console.log("NONE OF THE PERIODS FOUND");
                    break;
            }

            if (dayCount >= 0 && dayCount <= 56 ) {
                this.small += 1;
            } else if (dayCount >= 84 && dayCount <= 336) {
                this.med += 1;
            } else if (dayCount > 336 && dayCount <= 3024) {
                this.large += 1;
            } else {
                console.log(`Day count is ${dayCount} and was not added fix this!@#!@#!@#`);
            }
        });

        /*
        // convert number + DAILY to value range

        this.patternCounts = [];

        this.definedPatterns.map(pattern => {

            const patternName = pattern.name;

            var matches = this.sampledPatterns.filter(sample => {
                return sample.name === patternName && sample.cost != 0;
            })
            this.patternCounts.push({
                name: patternName,
                count: matches.length
            });
        });

        this.periodCounts = [];

        var uniquePeriods = _.union(this.sampledPatterns.map(pattern => { return pattern.period }));

        uniquePeriods.forEach(period => {
            var numPeriodCount = this.sampledPatterns.filter(pattern => {
                return pattern.period === period;
            }).length;

            this.periodCounts.push({
                name: period,
                count: numPeriodCount
            });
        });
        */
    }
}

export default new PatternsStore();