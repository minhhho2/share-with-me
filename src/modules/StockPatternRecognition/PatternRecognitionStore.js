

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
            name: 'example view'
        }
    ]

}
export default new PatternRecognitionStore();