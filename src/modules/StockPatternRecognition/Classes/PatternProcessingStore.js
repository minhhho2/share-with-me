

import { observable, action } from 'mobx';
import DTW from 'dtw';
import _ from 'lodash';
import PolynomialRegression from 'ml-regression-polynomial';


import MockPatterns from './MockPatterns';
import StockPattern from '../../../api/StockPatternApi';

class PatternProcessingStore {

    @observable period = 'TEST_INTRADAY';
    @observable symbol = 'TEST_ASX:XJO';
    @observable interval = 'TEST_5MIN';
    @observable outputSize = 'TEST_COMPACT';


    @observable samplePattern = {}
    @observable stockPatterns = [];


    @action
    setup = () => {
        console.log('Setting up PatternProcessingStore');    
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
export default new PatternProcessingStore();