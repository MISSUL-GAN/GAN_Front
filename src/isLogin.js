const isLogin = () => {
    const id = JSON.parse(JSON.parse(window.sessionStorage.getItem("persist:[object Object]")).member).id;
    return id > 0 ? true : false;
}

export default isLogin;