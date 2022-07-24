import React from "react";
import { Link } from 'react-router-dom';
import { AUTH_URL } from './LoginKey';

function Home() {
    return(
        <>
        <div> 여기는 카톡 로그인 페이지...🙃 </div>
        <br/><br/>

        <a id="custom-login-btn" href = { AUTH_URL }>
        <img
            src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
            width="222"
            alt="카카오 로그인"
        />
        </a>

        <br/><br/><br/>
        <Link to = '/home'> 로그인 없이 둘러볼래요 </Link>

        </>
    );
}

export default Home;