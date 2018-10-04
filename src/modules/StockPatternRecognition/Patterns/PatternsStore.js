

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
        //this.sampledPatterns = MockPatterns.sampled.slice();  // TODO: breaks because mongo is _id.$oid but sample is id
        // Get Sampled Patterns
        StockPatternApi.readAll()
            .then(res => {
                this.sampledPatterns = res.data.slice();
                console.log(this.sampledPatterns);
            }).catch(err => console.log(err));

    }

    populateSampledPatterns = () => {

        MockPatterns.sampled.forEach(sample => {
            const data = {
                name: sample.name,
                distance: sample.distance,
                values: sample.values
            };
            StockPatternApi.create(data).then(res => console.log(res)).catch(err => console.log(err));

        });
    }
}

export default new PatternsStore();