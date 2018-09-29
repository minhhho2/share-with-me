import axios from 'axios';

import ApiKey from './config/ApiKey';

const APIKEY = ApiKey.alphaVantage;

class TimeSeriesApi {

    checkArguments = (object) => {
        // get list of keys
        // check function for each type of key
        // flag to return error
    }

    get = (period, symbol, interval, outputSize) => {
        // https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=ASX:XJO&interval=60min&outputsize=full&apikey=${APIKEY}

        return axios.get(`https://www.alphavantage.co/query?function=${period}&symbol=${symbol}&interval=${interval}&outputsize=${outputSize}&apikey=${APIKEY}`);
    }
}

export default new TimeSeriesApi();