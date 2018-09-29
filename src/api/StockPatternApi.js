import axios from 'axios';

const BASE_URL = 'https://api.mlab.com/api/1';
const DB_NAME = 'sharewithme';
const API_KEY = 'gxZrMVaRIfbDLntbuv9FXAngSe-9eotO';
const COLLECTION = 'StockPattern'

class StockPatternApi {

    /*
        GET /databases/{database}/collections/{collection}
        Example listing all documents in a given collection:
        https://api.mlab.com/api/1/databases/my-db/collections/my-coll?apiKey=myAPIKey
    
    */
    getAll = () => {
        return axios.get(`${BASE_URL}/databases/${DB_NAME}/collections/${COLLECTION}?apiKey=${API_KEY}`);
    }

    /* 
        GET /databases/{database}/collections/{collection}/{_id}
        Example get the document with the specified _id:
        https://api.mlab.com/api/1/databases/my-db/collections/my-coll/4e7315a65e4ce91f885b7dde?apiKey=myAPIKey 
    */
    get = (id) => {
        return axios.get(`${BASE_URL}/databases/${DB_NAME}/collections/${COLLECTION}/${id}?apiKey=${API_KEY}`);
    }
}
export default new StockPatternApi();