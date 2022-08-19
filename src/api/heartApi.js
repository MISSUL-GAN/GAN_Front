import { Axios } from "./api";

export const getHeartMembers = async (drawingId) => {
    const response = await Axios.get(`/heart/${drawingId}`);
    return response.data;
}

export const heart = async (drawingId) => {
    const response = await Axios.post(`/heart/${drawingId}`);
    return response.data;
}

export const unheart = async (drawingId) => {
    const response = await Axios.delete(`/heart/${drawingId}`);
    return response.data;
}