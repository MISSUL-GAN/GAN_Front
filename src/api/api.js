import axios from 'axios';
import { getAccessToken } from '../util/tokenUtil';

const BASE_URL = "https://api.missulgan.art";
const accessToken = getAccessToken();

export const Axios = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
});

export const setAccessToken = (accessToken) => {
    Axios.defaults.headers = {
        Authorization: `Bearer ${accessToken}`,
    };
};