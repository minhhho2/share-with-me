// https://www.alphavantage.co/query?function=SECTOR&apikey=demo

// import dependencies
import axios from 'axios';
const APIKEY = 'SOZRS7W76Y7NL8MZ';

class SectorApi {

    get = () => {
        return axios.get(`https://www.alphavantage.co/query?function=SECTOR&apikey=${APIKEY}`);
    }
}

export default new SectorApi();