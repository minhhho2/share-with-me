// https://www.alphavantage.co/documentation/#

import axios from 'axios';
import MockPatterns from '../modules/StockPatternRecognition/MockPatterns';
import config from './config/config';

const APIKEY = config.alphaVantageApiKey;

class TimeSeriesApi {



    get = (period, symbol, interval, outputSize) => {

        // Check arguments
        if (!this.checkArguments(period, symbol, interval, outputSize)) {
            return;
        }

        // Make Api Call - example - https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=ASX:XJO&interval=60min&outputsize=full&apikey=${APIKEY}
        return axios.get(`https://www.alphavantage.co/query?function=${period}&symbol=${symbol}&interval=${interval}&outputsize=${outputSize}&apikey=${APIKEY}`);
    }

    checkArguments = (period, symbol, interval, outputSize) => {
        // TODO: check symbol

        // check period
        if (!MockPatterns.periodOptions.includes(period)) {
            console.log(`Error @ TimeSeriesApi.js: Incorrect period provided`);
            return false;

            // check interval
        } else if (!MockPatterns.intervalOptions.includes(interval)) {
            console.log(`Error @ TimeSeriesApi.js: Incorrect interval provided`);
            return false;

            // check outputSize
        } else if (!MockPatterns.outputSizeOptions.includes(outputSize)) {
            console.log(`Error @ TimeSeriesApi.js: Incorrect outputSize provided`);
            return false;
        } else {
            return true;
        }
    }
}

export default new TimeSeriesApi();