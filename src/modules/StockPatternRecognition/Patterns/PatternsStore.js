

import { observable, action } from 'mobx';
import MockPatterns from '../constants/MockPatterns';
import _ from 'lodash';

import StockPatternApi from '../../../api/StockPatternApi';


class PatternsStore {

    @observable definedPatterns = [];
    @observable sampledPatterns = [];
    @observable patternCounts = [];
    @observable periodCounts = [];


    @action
    setup = () => {

        // Get defined patterns from static file
        this.definedPatterns = MockPatterns.defined.slice();

        // Get Sampled Patterns
        StockPatternApi.readAll().then(res => {

            this.sampledPatterns = res.data.slice();
            console.log(this.sampledPatterns);

        }).catch(err => console.log(err));

        // Create patterns if empty
        if (this.sampledPatterns.length <= 0) {
            this.createPatterns();
        }

        this.computeStats();
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

    createPatterns = () => {
        var promises = [];

        this.definedPatterns.forEach(pattern => {
            promises.concat(this.createPatternSlantedDown(pattern));
            promises.concat(this.createPatternSlantedUp(pattern));
            //this.createPatternNoise(pattern);
        });

        Promise.all(promises).then(
            StockPatternApi.readAll().then(res => {

                var sampledPatterns = res.data.slice();

                // Store patterns
                if (sampledPatterns.length > 0) {
                    this.sampledPatterns = sampledPatterns;
                    console.log(this.sampledPatterns);

                }
            }).catch(err => console.log(err))

        ).catch(err => console.log(err));

    }

    createPatternSlantedDown = (pattern) => {

        var promises = [];


        for (var offset = 0; offset <= 15; offset += 5) {    // TODO: SET to 30

            var dupPattern = JSON.parse(JSON.stringify(pattern));
            dupPattern.values = dupPattern.values.map((value, index) => {
                return value + (dupPattern.values.length - 1 - index) * offset;
            });

            var promise = StockPatternApi.create(dupPattern);
            promise.then(res => console.log(res))
                .catch(err => console.log(err));

            promises.push(promise);
        }

        return promises;
    }

    createPatternSlantedUp = (pattern) => {

        var promises = [];

        // slant up in offsets of 5
        for (var offset = 0; offset <= 15; offset += 5) {    // TODO: SET to 30

            var dupPattern = JSON.parse(JSON.stringify(pattern));
            dupPattern.values = dupPattern.values.map((value, index) => {
                return value + index * offset;
            });

            var promise = StockPatternApi.create(dupPattern);
            promise.then(res => console.log(res))
                .catch(err => console.log(err));

            promises.push(promise);
        }

        return promises;
    }

    createPatternNoise = (pattern) => {
        for (var i = 0; i < 5; i++) {

            var dupPattern = JSON.parse(JSON.stringify(pattern));
            dupPattern.values = dupPattern.values.map(value => {
                return value + Math.random() * 50;
            });

            StockPatternApi.create(dupPattern)
                .then(res => console.log(res))
                .catch(err => console.log(err));
        }

    }
}

export default new PatternsStore();