

import { observable, action } from 'mobx';
import DefinedPatterns from './DefinedPatterns';
import _ from 'lodash';

class PatternsStore {

    @observable definedPatterns = DefinedPatterns.slice();

    @action
    setup = () => {
        this.definedPatterns = DefinedPatterns.slice();
    }

}

export default new PatternsStore();