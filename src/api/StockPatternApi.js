import axios from 'axios';

const DB_NAME = 'sharewithme';
const API_KEY = 'gxZrMVaRIfbDLntbuv9FXAngSe-9eotO';
const COLLECTION = 'StockPattern'
const BASE_URL = 'https://api.mlab.com/api/1/databases/' + DB_NAME + '/collections/' + COLLECTION;

// Set up default headers
axios.defaults.headers.common = {
    'Content-Type': 'application/json'
};

class StockPatternApi {

    /*
        Create stock pattern
        POST /databases/{database}/collections/{collection}
        "https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey"
    */
    create = (data) => {
        console.log("Creating new pattern");

        const newPattern = {
            name: data.name,
            distance: data.distance,
            rawValues: data.rawValues,   // prices
            parsedValues: data.parsedValues,
            matchedPatternValues: data.matchedPatternValues,
            date: data.date,
            period: data.period,
            symbol: data.symbol
        }
        return axios.post(`${BASE_URL}?apiKey=${API_KEY}`, newPattern);


    }

    /* 
        Get single stock pattern by id
        GET /databases/{database}/collections/{collection}/{_id}
        https://api.mlab.com/api/1/databases/my-db/collections/my-coll/4e7315a65e4ce91f885b7dde?apiKey=myAPIKey 
    */
    read = (id) => {
        console.log("Getting one pattern");
        return axios.get(`${BASE_URL}/${id}?apiKey=${API_KEY}`);
    }

    /*
        Update stock pattern
    */

    update = (data) => {
        return;
    }

    /* 
        Delete stock pattern by id
        DELETE /databases/{database}/collections/{collection}/{_id}
        https://api.mlab.com/api/1/databases/my-db/collections/my-coll/4e7315a65e4ce91f885b7dde?apiKey=myAPIKey
    */

    delete = (id) => {
        console.log("Deleting one pattern");
        return axios.delete(`${BASE_URL}/${id}?apiKey=${API_KEY}`);
    }

    /*
        GET /databases/{database}/collections/{collection}
        Example listing all documents in a given collection:
        https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey
    
    */
    readAll = () => {
        console.log("Reading all patterns");
        return axios.get(`${BASE_URL}?apiKey=${API_KEY}`);
    }

}
export default new StockPatternApi();