import { Axios } from "./api";

export const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    const response = await Axios.post('/image/upload', formData);
    return response.data;
}