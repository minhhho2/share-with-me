

import { observable, action } from 'mobx';
import _ from 'lodash';
import Options from '../../constants/Options';

/* 
    Contains input for time series price selection
*/
class InputStore {

    @observable input = {
        period: '',
        symbol: '',
        interval: '',
        outputSize: ''
    }
    
    @action
    setDefaultValues = () => {
        this.input.period = Options.period[0].value;
        this.input.symbol = Options.symbol[0].value;
        this.input.outputSize = Options.outputSize[0].value;
        this.input.interval = Options.interval[0].value;
    }

    @action
    clearDefaultValues = () => {
        this.input = _.mapValues(this.input, () => '');
    }

    @action
    updateInputKeyValue = (key, value) => {
        this.input[key] = value;
    }
}


// get sectors
export default new InputStore();