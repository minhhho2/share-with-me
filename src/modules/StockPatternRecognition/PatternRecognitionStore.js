

import { observable } from 'mobx';

class PatternRecognitionStore {

    @observable activeView = 'Testing';
    
    @observable views = [
        {
            name: 'Training'
        },
        {
            name: 'Testing'
        },
        {
            name: 'normalizing'
        }
    ]

}
export default new PatternRecognitionStore();