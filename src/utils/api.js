import axios from 'axios';

const BASE_URL = "https://api.missulgan.art";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers

export async function getMember() {
    const response = await axios.get('/member/me');
    return response.data;
}