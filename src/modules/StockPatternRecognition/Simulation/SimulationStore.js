

import { observable, action } from 'mobx';
import DTW from 'dtw';
import _ from 'lodash';
import Options from '../constants/Options';

class SimulationStore {

    @observable input = {
        period: '',
        symbol: '',
        interval: '',
        outputSize: ''
    }


    @observable timeSeriesData = [];
    @observable timeSeriesGraphData = [];

    @observable timeSeriesAttributes = {
        startDate: '',
        endDate: '',
        startPrice: '',
        endPrice: '',
        numberDataPoints: 0
    }

    @observable windowPos = null;
    @observable intervalId = null;
    @observable period = 14;

    @action
    setup = () => {
        this.default();
    }

    @action
    clear = () => {
        const keys = Object.keys(this.input);
        keys.forEach(key => {
            this.input[key] = '';
        })
    }
    @action
    default = () => {
        this.input.period = Options.period[0].value;
        this.input.symbol = Options.symbol[0].value;
        this.input.outputSize = Options.outputSize[0].value;
        this.input.interval = Options.interval[0].value;
    }

    @action
    updateInputKeyValue = (key, value) => {
        this.input[key] = value;
    }

    @action
    updateTimeSeriesAttributes = () => {
        const numberDataPoints = this.timeSeriesData.length;
        this.updatetimeSeriesAttributesKeyValue('numberDataPoints', numberDataPoints);
        this.updatetimeSeriesAttributesKeyValue('startDate', this.timeSeriesData[0]['date'].toString().split('GMT')[0]);
        this.updatetimeSeriesAttributesKeyValue('endDate', this.timeSeriesData[numberDataPoints - 1]['date'].toString().split('GMT')[0]);
        this.updatetimeSeriesAttributesKeyValue('startPrice', this.timeSeriesData[0]['price']);
        this.updatetimeSeriesAttributesKeyValue('endPrice', this.timeSeriesData[numberDataPoints - 1]['price']);
    }

    @action
    updatetimeSeriesAttributesKeyValue = (key, value) => {
        this.timeSeriesAttributes[key] = value;
    }



    /* 
        Compare samplePattern to all stock Patterns
    
    labelSample = (sample) => {
        const THRESSHOLD = 0.25;
        var dtw = new DTW();

        // Container for all matches
        var matches = [];

        // Find all patterns that resemble sample
        this.stockPatterns.forEach(pattern => {
            const x = _.range(sample.length);

            // TODO: create stock patten regression
             
            const cost = dtw.compute(s, t); // s and t are arrays
            if (cost <= THRESSHOLD) {
                matches.push();
            }
        });
    }
    */

    // https://www.npmjs.com/package/dtw
    // https://github.com/mljs/regression-polynomial
    // https://www.npmjs.com/package/ml-regression
    // http://www.cs.uccs.edu/~jkalita/work/StudentResearch/RajagopalSureshMSProject2016.pdf
}


// get sectors
export default new SimulationStore();