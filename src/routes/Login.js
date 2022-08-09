import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
    let aToken = new URL(window.location.href).searchParams.get("accessToken");
    let rToken = new URL(window.location.href).searchParams.get("refreshToken");
    let profileNickname = new URL(window.location.href).searchParams.get("profileNickname");
    let isFirstTime = new URL(window.location.href).searchParams.get("firstTime");

    let navigate = useNavigate();

    useEffect(() => {
        console.log("액세스토큰: " + aToken);
        console.log("리프레쉬토큰 : " + rToken);
        //console.log("프로파일 닉넴: " + profileNickname);
        //console.log("처음 접속?: " + isFirstTime);

        axios.get("/member/me", {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        })
        .then(function (res) {
          console.log(res.data.userNickname);
          console.log(res.data.profileImage);
          console.log(res.data.accountEmail);
        });
        
        navigate('/join'); // 이미 가입했던 회원이면 받아서 /home으로 보내야할듯
      }, []);
}

export default Login;