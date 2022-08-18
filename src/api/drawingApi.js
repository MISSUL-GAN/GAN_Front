import { Axios } from "./api";

export const addDrawing = async (drawingDTO) => {
    const response = await Axios.post('/drawing', drawingDTO);
    return response.data;
}

export const getDrawings = async () => {
    const response = await Axios.get('/drawing');
    return response.data;
}