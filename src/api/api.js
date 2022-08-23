import axios from 'axios';
import { getAccessToken, getRefreshToken, saveToken, clearToken } from '../util/tokenUtil';
import { useNavigate } from "react-router-dom";

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

Axios.interceptors.request.use(
    async (config) => {
        const accessToken = await Promise.resolve(getAccessToken());

        config.headers = {
            Authorization: `Bearer ${accessToken}`,
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

Axios.interceptors.response.use(
    (response) => {
        return response; // 200대
    },
    async function (error) { // 200대 이외
        const originalRequest = error.config;
        const refreshToken = getRefreshToken();

        if(error.response?.status === 401 && originalRequest.url === '/login/oauth'){ 
            return Promise.reject(error);
        }

        if(error.response?.status === 401 && refreshToken) {
            try {
                if(refreshToken) { 
                    const response = await Axios.get(`​/auth​/renew​/${refreshToken}`);
                    const newAccessToken = response.data.accessToken;

                    saveToken(newAccessToken, refreshToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return Axios(originalRequest); //새로 받은 토큰으로 다시 요청하기
                }
                else { 
                    clearToken();
                    useNavigate("home");
                }
            }
            catch (error) {
                clearToken();
                useNavigate("home");
            }
        }
        return Promise.reject(error);
    }
)


