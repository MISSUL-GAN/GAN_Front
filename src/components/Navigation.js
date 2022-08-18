import React from "react";
import './Navigation.css';
import { AUTH_URL } from '../LoginKey';
import { useSelector, useDispatch } from 'react-redux';
import { clearMember } from "../redux/memberReducer";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../util/tokenUtil";

function Navigation() {
    const member = useSelector(state => state.member);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        clearToken();
        dispatch(clearMember());
    };

    function checkLogin(e) {
        if(member.signed) 
            window.location.href = `${e.target.value}`;

        else {
            const modal = document.getElementById("alert-modal");
            modal.style.display = "flex";
        }  
    }

    async function changeLogin() {
        if (member.signed) {
            if (window.confirm("로그아웃 하시겠습니까?")) {
                alert("로그아웃이 완료되었습니다.\n비회원 상태에서는 일부 기능이 제한될 수 있습니다.");
                await logout();
                document.getElementById("my-modal").style.display = "none";
                navigate('/home');
            }
        }
        else
            window.location.href = AUTH_URL;
    }

    function clickImg() {
        const modal = document.getElementById("my-modal");
        modal.style.display = (modal.style.display === "flex") ? "none" : "flex";
    }

    function clickAlertClose() {
        const modal = document.getElementById("alert-modal");
        modal.style.display = "none";
        document.body.style.overflow = "unset";
    }

    return (
        <>
            <nav className="navbar">
                <a className="navLogo" href='/home'> <img id="logoImg" alt="" src="/img/naviLogo.png" /> </a>

                <div id="menu">
                    <button className="navItem" onClick={checkLogin} value="/create"> GAN 사진 변환 </button>
                    <a className="navItem" href='/home'> 미슐간 </a>

                    {member.profileImage
                        ? <div id="img-wrapper"> <img src={member.profileImage} onClick={clickImg} alt="" /> </div>
                        : <a className="navItem" href={AUTH_URL}> 로그인 </a>
                    }
                </div>
            </nav>

            <div id="my-modal">
                <button className="smallMenu" onClick={checkLogin} value="/myPage"> MY </button>
                <button className="smallMenu" onClick={changeLogin}> 로그아웃 </button>
            </div>

            {/* <div id="alert-modal" className="warning-modal">
                <div className="warning-modal-window">
                    <p className="warning-modal-close" onClick={clickAlertClose}> x </p>
                    <div className="alert-content">
                        <p> 로그인이 필요한 서비스입니다 </p>

                        <div>
                            <button id="kakaoLogin" onClick={() => { window.location.href = { AUTH_URL }; }}> <img src="/img/kakao.png" alt="" /> </button>
                            <button id="googleLogin" onClick={() => { window.location.href = { AUTH_URL }; }}> <img src="/img/google.png" alt="" /> </button>
                            <button id="naverLogin" onClick={() => { window.location.href = { AUTH_URL }; }}> <img src="/img/naver.png" alt="" /> </button>
                        </div>

                        <div>
                            <p> 카카오 로그인 </p>
                            <p> 구글 로그인 </p>
                            <p> 네이버 로그인 </p>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default Navigation;

