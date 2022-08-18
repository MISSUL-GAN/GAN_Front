import { Axios } from "./api";

export const getMember = async () => {
    console.log(Axios.defaults.headers);
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