import { Axios } from "./api";

export const getScrap = async () => {
    const response = await Axios.get(`/scrap`);
    return response.data;
}

export const scrap = async (drawingId) => {
    const response = await Axios.post(`/scrap/${drawingId}`);
    return response.data;
}

export const unscrap = async (drawingId) => {
    const response = await Axios.delete(`/scrap/${drawingId}`);
    return response.data;
}