

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

            var sampledPatterns = res.data.slice();

            // Add defined if no labelled patterns exist
            if (sampledPatterns.length <= 0) {
                for (var i = 0; i < 20; i++) {
                    MockPatterns.defined.forEach(pattern => {

                        var newPattern = pattern;
                        newPattern.values = pattern.values.map(value => {
                            return value + Math.random() * 2;
                        });

                        StockPatternApi.create(newPattern)
                            .then(res => console.log(res))
                            .catch(err => console.log(err));
                    });
                }


                // Store data from db to local for use
            } else {
                this.sampledPatterns = sampledPatterns;
                console.log(this.sampledPatterns);
            }

        }).catch(err => console.log(err));
        this.patternCounts = [];
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

        var uniquePeriods = _.union(this.sampledPatterns.map(pattern => {return pattern.period}));

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