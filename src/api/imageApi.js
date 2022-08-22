import { Axios } from "./api";

export const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    const response = await Axios.post('/image/upload', formData);
    return response.data;
}

export const convertImage = async (originImg, styleImg, convertTag) => {
    const formData = new FormData();
    formData.append("origin_img", originImg);
    formData.append("style_img", styleImg);
    formData.append("convert_tag", convertTag);
    formData.append("token", new Date().getTime());
    const response = await Axios.post('https://image.missulgan.art/image/convert', formData);
    return response.data;
}