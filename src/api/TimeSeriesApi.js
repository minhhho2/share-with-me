// https://www.alphavantage.co/documentation/#

import axios from 'axios';
import AlphaOptions from './AlphaOptions';
import config from './config/config';

const BASE_URL = 'https://www.alphavantage.co/';
const APIKEY = config.alphaVantageApiKey;

class TimeSeriesApi {

    // Make Api Call - example - https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=ASX:XJO&interval=60min&outputsize=full&apikey=${APIKEY}
    get = (period, symbol) => {
        console.log(`Time Series API for ${period} and ${symbol}`);

        this.checkArguments(period, symbol); // check arguments

        return axios.get(`${BASE_URL}query?function=${period}&symbol=${symbol}&outputsize=full&apikey=${APIKEY}`);
    }

    checkArguments = (period, symbol) => {
        if (!AlphaOptions.periodOptions.includes(period)) {
            console.log(`Error @ TimeSeriesApi.js: Incorrect period, ${period},  provided`);
        }

        // check symbol
        if (!AlphaOptions.symbolOptions.includes(symbol)) {
            console.log(`Error @ TimeSeriesApi.js: Incorrect symbol, ${symbol},  provided`);
        }
    }
}

export default new TimeSeriesApi();