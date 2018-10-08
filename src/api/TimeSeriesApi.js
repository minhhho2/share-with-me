// https://www.alphavantage.co/documentation/#

import axios from 'axios';
import AlphaOptions from './AlphaOptions';
import config from './config/config';

const BASE_URL = 'https://www.alphavantage.co/';
const APIKEY = config.alphaVantageApiKey;

class TimeSeriesApi {

    get = (symbol, outputSize) => {

        this.checkArguments(symbol, outputSize); // check arguments

        // Make Api Call - example - https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=ASX:XJO&interval=60min&outputsize=full&apikey=${APIKEY}
        return axios.get(`${BASE_URL}query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=${outputSize}&apikey=${APIKEY}`);
    }

    checkArguments = (symbol, outputSize) => {
        
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