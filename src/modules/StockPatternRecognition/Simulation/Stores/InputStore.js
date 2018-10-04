

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
        outputSize: ''
    }
    
    @action
    setDefaultValues = () => {
        this.input.period = 14;
        this.input.symbol = Options.symbol[3].value;
        this.input.outputSize = Options.outputSize[0].value;
    }

    @action
    clearDefaultValues = () => {
        this.input = _.mapValues(this.input, () => '');
        this.input.period = 14;
    }

    @action
    updateInputKeyValue = (key, value) => {
        this.input[key] = value;
    }
}


// get sectors
export default new InputStore();