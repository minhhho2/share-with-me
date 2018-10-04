

import { observable } from 'mobx';

class PatternRecognitionStore {

    @observable activeView = 'patterns';
    
    @observable views = [
        {
            name: 'patterns'
        },
        {
            name: 'simulation'
        }
    ]

}
export default new PatternRecognitionStore();