import React from 'react';
import { getAuthUrl } from '../LoginKey';
import './LoginAlert.css';

const LoginAlert = (props) => {
    const clickAlertClose = () => props.handleLoginAlertClose();

    return (
        <div id="alert-modal" className="warning-modal">
            <div className="warning-modal-window">
                <p className="warning-modal-close" onClick={clickAlertClose}> x </p>
                <div className="alert-content">
                    <p> 로그인이 필요한 서비스입니다 </p>

                    <div>
                        <button id="kakaoLogin" onClick={() => { window.location = getAuthUrl("kakao"); }}> <img src="/img/kakao.png" alt="" /> </button>
                        <button id="googleLogin" onClick={() => { window.location = getAuthUrl("google"); }}> <img src="/img/google.png" alt="" /> </button>
                        <button id="naverLogin" onClick={() => { window.location = getAuthUrl("naver"); }}> <img src="/img/naver.png" alt="" /> </button>
                    </div>

                    <div>
                        <p> 카카오 로그인 </p>
                        <p> 구글 로그인 </p>
                        <p> 네이버 로그인 </p>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default LoginAlert;