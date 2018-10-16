

import { observable } from 'mobx';

class PatternRecognitionStore {

    @observable activeView = 'simulation';
    
    @observable views = [
        {
            name: 'patterns'
        },
        {
            name: 'simulation'
        },
        {
            name: 'normalizing'
        }
    ]

}
export default new PatternRecognitionStore();