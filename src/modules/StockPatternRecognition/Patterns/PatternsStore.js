

import { observable, action } from 'mobx';
import DefinedPatterns from './DefinedPatterns';
import _ from 'lodash';
import MockSamplePatterns from './MockSamplePatterns';

import StockPatternApi from '../../../api/StockPatternApi';


class PatternsStore {

    @observable definedPatterns = [];
    @observable sampledPatterns = [];

    @action
    setup = () => {
        // Get defined patterns from static file
        this.definedPatterns = DefinedPatterns.slice();

        // Get Sampled Patterns
        StockPatternApi.readAll().then(res => {
            this.sampledPatterns = res.data.slice();
            console.log(this.sampledPatterns);
        }).catch(err => console.log(err));
    }

}

export default new PatternsStore();