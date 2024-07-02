import axios from "axios";
import config from './config.json';

const SERVER_KEY = config.SERVER_URL_KEY;
const authToken = localStorage.getItem('token')

const useAxios = axios.create({
    baseURL: SERVER_KEY, 
    headers:{
        'authorization': `Bearer ${authToken}`
    }
})

export default useAxios