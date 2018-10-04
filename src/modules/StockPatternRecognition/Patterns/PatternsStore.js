

import { observable, action } from 'mobx';
import MockPatterns from '../constants/MockPatterns';
import _ from 'lodash';

import StockPatternApi from '../../../api/StockPatternApi';


class PatternsStore {

    @observable definedPatterns = [];
    @observable sampledPatterns = [];

    @action
    setup = () => {

        // Get defined patterns from static file
        this.definedPatterns = MockPatterns.defined.slice();

        // Get Sampled Patterns
        StockPatternApi.readAll().then(res => {

            var sampledPatterns = res.data.slice();

            // Add defined if no labelled patterns exist
            if (sampledPatterns.length <= 0) {
                MockPatterns.defined.forEach(pattern => {
                    StockPatternApi.create(pattern)
                        .then(res => console.log(res))
                        .catch(err => console.log(err));
                });

            // Store data from db to local for use
            } else {
                this.sampledPatterns = sampledPatterns;
                console.log(this.sampledPatterns);
            }

        }).catch(err => console.log(err));

    }

    populateSampledPatterns = () => {

        MockPatterns.sampled.forEach(sample => {
            const data = {
                name: sample.name,
                cost: sample.cost,
                values: sample.values
            };
            StockPatternApi.create(data).then(res => console.log(res)).catch(err => console.log(err));

        });
    }
}

export default new PatternsStore();