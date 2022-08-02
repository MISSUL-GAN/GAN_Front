import React from "react";

function Login() {
    let aToken = new URL(window.location.href).searchParams.get("accessToken");
    let rToken = new URL(window.location.href).searchParams.get("refreshToken");

    return(
        <>
            <p> 로그인 페이지임 </p>
            <p> accessToken : {aToken}</p>
            <p> refreshToken : {rToken}</p>
        </>
    );
}

export default Login;