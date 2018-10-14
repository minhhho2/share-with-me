

import { observable } from 'mobx';

class PatternRecognitionStore {

    @observable activeView = 'resampling';
    
    @observable views = [
        {
            name: 'patterns'
        },
        {
            name: 'simulation'
        },
        {
            name: 'resampling'
        }
    ]

}
export default new PatternRecognitionStore();