

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
    @observable patternCounts = [];     // Statistic stores
    @observable periodCounts = [];

    /* For adjusting sampling types */
    @observable maxOffset = 6;
    @observable incrementOffset = 2;
    
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
            promises.concat(this.createPatternSlantedDown(pattern));
            promises.concat(this.createPatternSlantedUp(pattern));
            //promises.concat(this.createPatternNoise(pattern));
        });

        return promises;
    }

    createPatternSlantedDown = (pattern) => {

        var promises = [];

        for (var offset = 0; offset <= this.maxOffset; offset += this.incrementOffset) {

            var dupPattern = JSON.parse(JSON.stringify(pattern));
            dupPattern.values = dupPattern.values.map((value, index) => {
                return value + (dupPattern.values.length - 1 - index) * offset;
            });

            dupPattern.values = Resampling.resample(dupPattern.values);
//            dupPattern.values = utils.normalize(dupPattern.values);
            dupPattern.name = `${pattern.name} slanted down @ ${offset}`;

            var promise = StockPatternApi.create(dupPattern);
            promise.then(res => console.log(res)).catch(err => console.log(err));
            promises.push(promise);
        }

        return promises;
    }

    createPatternSlantedUp = (pattern) => {

        var promises = [];

        // slant up in offsets of 5
        for (var offset = 0; offset <= this.maxOffset; offset += this.incrementOffset) {

            var dupPattern = JSON.parse(JSON.stringify(pattern));
            dupPattern.values = dupPattern.values.map((value, index) => {
                return value + index * offset;
            });

            dupPattern.values = Resampling.resample(dupPattern.values);

            //dupPattern.values = utils.normalize(dupPattern.values);
            dupPattern.name = `${pattern.name} slanted up @ ${offset}`;

            var promise = StockPatternApi.create(dupPattern);
            promise.then(res => console.log(res)).catch(err => console.log(err));
            promises.push(promise);
        }

        return promises;
    }

    createPatternNoise = (pattern) => {
        var promises = [];

        for (var i = 0; i < 5; i++) {

            var dupPattern = JSON.parse(JSON.stringify(pattern));
            dupPattern.values = dupPattern.values.map(value => {
                return value + Math.random() * 30;
            });

            dupPattern.values = Resampling.resample(dupPattern.values);
//            dupPattern.values = utils.normalize(dupPattern.values);

            var promise = StockPatternApi.create(dupPattern);
            promise.then(res => console.log(res)).catch(err => console.log(err));
            promises.push(promise);
        }

        return promises;
    }

    computeStats = () => {
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
    }
}

export default new PatternsStore();