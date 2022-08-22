const isLogin = () => {
    const signed = JSON.parse(JSON.parse(window.localStorage.getItem("persist:root")).member).signed;
    return signed;
}

export default isLogin;