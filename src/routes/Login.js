import React from "react";
import { Link } from 'react-router-dom';
import { AUTH_URL } from '../LoginKey';
import Navigation from "../components/Navigation";
import { useSelector } from 'react-redux';

function Login() {
    const code = useSelector( (state) => state ); 
    return(
        <>
        <Navigation/>
        <div> 여기는 카톡 로그인 페이지...🙃 </div>
        <br/><br/>

        { 
        (code == null) ? 
            <a id="custom-login-btn" href = { AUTH_URL }>
            <img
                src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                width="222"
                alt="카카오 로그인"
            />
            </a>
        : <p> 이미 로그인 중이세요..<br/> 현재 인가코드 : { code } </p> 
        }
        
        <br/><br/><br/>
        <Link to = '/home'> 
            <button type="button" className="btn btn-dark"> 로그인 없이 둘러볼래요 </button>
        </Link>
        { /* 어차피 시작 - 로그인 - 갤러리 에서 시작 - 갤러리 (로그인은 네비바 접근) 으로 바뀔거라 이 버튼 나중에 지워야함 */ }

        </>
    );
}

export default Login;