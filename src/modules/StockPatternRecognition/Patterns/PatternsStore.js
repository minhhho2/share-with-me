

import { observable, action } from 'mobx';
import DefinedPatterns from './DefinedPatterns';
import _ from 'lodash';
import MockSamplePatterns from './MockSamplePatterns';

class PatternsStore {

    @observable definedPatterns = [];
    @observable sampledPatterns = [];

    @action
    setup = () => {
        this.definedPatterns = DefinedPatterns.slice();
        this.sampledPatterns = MockSamplePatterns.slice();
    }

}

export default new PatternsStore();