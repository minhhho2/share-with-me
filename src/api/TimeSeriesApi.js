// https://www.alphavantage.co/documentation/#

import axios from 'axios';
import MockPatterns from '../modules/StockPatternRecognition/MockPatterns';
import config from './config/config';

const BASE_URL = 'https://www.alphavantage.co/';
const APIKEY = config.alphaVantageApiKey;

class TimeSeriesApi {



    get = (period, symbol, interval, outputSize) => {

        // Check arguments
        this.checkArguments(period, symbol, interval, outputSize);

        // Make Api Call - example - https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=ASX:XJO&interval=60min&outputsize=full&apikey=${APIKEY}
        return axios.get(`${BASE_URL}query?function=${period}&symbol=${symbol}&interval=${interval}&outputsize=${outputSize}&apikey=${APIKEY}`);
    }

    checkArguments = (period, symbol, interval, outputSize) => {
        
        // check period
        if (!MockPatterns.periodOptions.includes(period)) {
            console.log(`Error @ TimeSeriesApi.js: Incorrect period provided`);
        }
        // check symbol
        if (!MockPatterns.symbolOptions.includes(symbol)) {
            console.log(`Error @ TimeSeriesApi.js: Incorrect symbol provided`);

        }
        // check interval
        if (!MockPatterns.intervalOptions.includes(interval)) {
            console.log(`Error @ TimeSeriesApi.js: Incorrect interval provided`);

        }
        // check outputSize
        if (!MockPatterns.outputSizeOptions.includes(outputSize)) {
            console.log(`Error @ TimeSeriesApi.js: Incorrect outputSize provided`);

        }
    }
}

export default new TimeSeriesApi();