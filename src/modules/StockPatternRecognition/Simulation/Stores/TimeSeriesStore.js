

import { observable, action } from 'mobx';
import _ from 'lodash';

class TimeSeriesStore {

    @observable data = [];

    @observable attributes = {
        startDate: '',
        endDate: '',
        startPrice: '',
        endPrice: '',
        numberDataPoints: ''
    }

    @observable indexRange = {
        start: 0,
        end: 0,
    }

    @action
    setup = () => {
        this.indexRange.end = this.data.length - 1;
    }

    @action
    updateAttributesKeyValue = (key, value) => {
        this.attributes[key] = value;
    }

    @action
    updateIndexRangeKeyValue = (key, value) => {
        this.indexRange[key] = value;
    }


    @action
    updateAttributes = () => {
        const numberDataPoints = this.data.length;
        this.updateAttributesKeyValue('numberDataPoints', numberDataPoints);
        this.updateAttributesKeyValue('startDate', this.data[0]['date'].toString().split('10:00:00')[0]);
        this.updateAttributesKeyValue('endDate', this.data[numberDataPoints - 1]['date'].toString().split('10:00:00')[0]);
        this.updateAttributesKeyValue('startPrice', this.data[0]['price']);
        this.updateAttributesKeyValue('endPrice', this.data[numberDataPoints - 1]['price']);
    }
}

export default new TimeSeriesStore();