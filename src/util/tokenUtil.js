export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const saveToken = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
};

export const clearToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
}