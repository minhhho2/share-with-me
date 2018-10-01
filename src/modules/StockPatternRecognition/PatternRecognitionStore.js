

import { observable, action } from 'mobx';

class PatternRecognitionStore {

    @observable activeView = 'simulation';
    
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