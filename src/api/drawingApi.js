import { Axios } from "./api";

export const addDrawing = async (drawingDTO) => {
    const response = await Axios.post('/drawing', drawingDTO);
    return response.data;
}

export const getDrawings = async () => {
    const response = await Axios.get('/drawing');
    return response.data;
}

export const deleteDrawing = async (drawingId) => {
    const response = await Axios.delete(`/drawing/${drawingId}`);
    return response.data;
}

export const getDrawing = async (drawingId) => {
    const response = await Axios.get(`/drawing/${drawingId}`);
    return response.data;
}

export const getMemberDrawings = async (memberId) => {
    const response = await Axios.get(`/drawing/member/${memberId}`);
    return response.data;
}