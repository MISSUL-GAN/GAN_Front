import axios from 'axios';
import { getAccessToken, getRefreshToken, saveToken, clearToken } from '../util/tokenUtil';
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

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
        return response; 
    },
    async function (error) {
        const originalRequest = error.config;
        const refreshToken = getRefreshToken();

        if(error.response?.status === 401 && originalRequest.url === `/auth/renew/${refreshToken}`){ 
            return Promise.reject(error);
        }

        if(error.response?.status === 401) {
            try {
                if(checkRefreshToken(refreshToken)) { 
                    const response = await Axios.get(`​/auth​/renew​/${refreshToken}`);
                    const newAccessToken = response.data.accessToken;

                    saveToken(newAccessToken, refreshToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return Axios(originalRequest); 
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

const checkRefreshToken = (refreshToken) => {
    let decodedToken = jwt_decode(refreshToken)
    let current = new Date();

    if(decodedToken.exp * 1000 < current.getTime())
        return false; // 만료

    else
        return true; // 만료 X
}



