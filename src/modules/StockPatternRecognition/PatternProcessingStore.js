

import { observable, action } from 'mobx';
import MockPatterns from './MockPatterns';

class PatternProcessingStore {

    @observable tester = 'swaggerrs';

    @action
    setup = () => {
        console.log('Setting up PatternProcessingStore');
    }

}


// get sectors
export default new PatternProcessingStore();