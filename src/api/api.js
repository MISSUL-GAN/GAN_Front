import axios from 'axios';
const BASE_URL = "https://api.missulgan.art";
const accessToken = localStorage.getItem("accessToken");

const Axios = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
});

export const getMember = async () => {
    const response = await Axios.get('/member/me');
    return response.data;
};
export const getName = async () => {
    const response = await Axios.get('/member/name');
    return response.data;
}
export const setName = async (name) => {
    const response = await Axios.put('/member/name', { name: name });
    return response.data;
}

export const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    const response = await Axios.post('/image/upload', formData);
    return response.data;
}

export const addDrawing = async (drawingDTO) => {
    const response = await Axios.post('/drawing', drawingDTO);
    return response.data;
}

export const getDrawings = async () => {
    const response = await Axios.get('/drawing');
    return response.data;
}