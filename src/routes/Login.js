import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';  
import { useDispatch } from 'react-redux';

function Login() {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    let aToken = new URL(window.location.href).searchParams.get("accessToken");
    let rToken = new URL(window.location.href).searchParams.get("refreshToken");
    let profileNickname = new URL(window.location.href).searchParams.get("profileNickname");
    let isFirstTime = new URL(window.location.href).searchParams.get("firstTime");

    useEffect(() => {
        axios.get("/member/me", {
          headers: {
            Authorization: `Bearer ${aToken}`,
          },
        })
        .then(function (res) {
          dispatch({ 
            type : '로그인',
            user : {nick : res.data.userNickname, email : res.data.accountEmail, image : res.data.profileImage, aToken : aToken, rToken : rToken}
          });

          if(true) //isFirstTime 들어갈 자리
            navigate('/join'); 

          else 
            navigate('/home'); 
        });
    }, []);
}

export default Login;