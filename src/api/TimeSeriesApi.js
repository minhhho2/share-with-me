// https://www.alphavantage.co/documentation/#

import axios from 'axios';
import AlphaOptions from './AlphaOptions';
import config from './config/config';

const BASE_URL = 'https://www.alphavantage.co/';
const APIKEY = config.alphaVantageApiKey;

class TimeSeriesApi {

    get = (period, symbol, outputSize) => {
        console.log(`Time Series API for ${period} and ${symbol} and ${outputSize}`);

        this.checkArguments(period, symbol, outputSize); // check arguments

        // Make Api Call - example - https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=ASX:XJO&interval=60min&outputsize=full&apikey=${APIKEY}
        return axios.get(`${BASE_URL}query?function=${period}&symbol=${symbol}&outputsize=${outputSize}&apikey=${APIKEY}`);
    }

    checkArguments = (period, symbol, outputSize) => {
        if (!AlphaOptions.periodOptions.includes(period)) {
            console.log(`Error @ TimeSeriesApi.js: Incorrect period, ${period},  provided`);
        }

        // check symbol
        if (!AlphaOptions.symbolOptions.includes(symbol)) {
            console.log(`Error @ TimeSeriesApi.js: Incorrect symbol, ${symbol},  provided`);
        }

        // check outputSize
        if (!AlphaOptions.outputSizeOptions.includes(outputSize)) {
            console.log(`Error @ TimeSeriesApi.js: Incorrect outputSize, ${outputSize}, provided`);
        }
    }
}

export default new TimeSeriesApi();