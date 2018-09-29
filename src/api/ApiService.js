import axios from 'axios';

const baseUrl = 'http://localhost:8080/api';

class ApiService {

    get = (url) => {
        return axios.get(baseUrl + url)
            .catch(err => alert(err))
            .then(res => alert(res.data.message))
    }

    post = (url, data) => {
        return axios.post(baseUrl + url, data)
            .catch(err => alert(err))
            .then(res => console.log(res.data));
    }

    put = (url, data) => {
        return axios.post(baseUrl + url, data)
            .catch(err => alert(err))
            .then(res => console.log(res.data));
    }

    delete = (url) => {
        return axios.delete(baseUrl + url)
            .catch(err => alert(err))
            .then(res => console.log(res.data));

    }
}
export default new ApiService();