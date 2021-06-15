import axios from 'axios'


const instance = axios.create({
    baseURL:'http://localhost:4000/',
    port: 4000,
    headers:{
        "Content-Type" : 'application/x-www-form-urlencoded'
    }
});

export const imageInstance = axios.create({
    baseURL:'http://localhost:4000/',
    port: 4000,
    headers:{
        "Content-Type" : 'multipart/form-data'
    }
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.crossDomain = true;

export default instance;