

import { observable, action } from 'mobx';
import _ from 'lodash';
import Options from '../../constants/Options';

/* 
    Contains input for time series price selection
*/
class InputStore {

    @observable input = {
        symbol: '',
        outputSize: ''
    }
    
    @action
    setDefaultValues = () => {
        this.input.symbol = Options.symbol[4].value;
        this.input.outputSize = Options.outputSize[0].value;
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