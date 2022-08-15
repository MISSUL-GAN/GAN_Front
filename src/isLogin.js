const isLogin = () => {
    const id = JSON.parse(window.sessionStorage.getItem("persist:[object Object]")).id;
    return id > 0 ? true : false;
}

export default isLogin;