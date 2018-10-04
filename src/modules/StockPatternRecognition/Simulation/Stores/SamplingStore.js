

import { observable, action } from 'mobx';

class SamplingStore {

    @observable currentSampleValues = [0, 1, 2, 3, 4, 5, 6, 7, 7];

    @action
    setSampleValues = (values) => {
        this.sampleValues = values;
    }
}

export default new SamplingStore();