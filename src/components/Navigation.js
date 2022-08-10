import React from "react";
import './Navigation.css';
import { AUTH_URL } from '../LoginKey';
import { useSelector, useDispatch } from 'react-redux';

function Navigation() {

    const user = useSelector( (state) => state );
    const dispatch = useDispatch();

    function checkLogin (e) {
        if(user.nick === null){
            const modal = document.getElementById("alert-modal");
            modal.style.display = "flex";
        }    
        else 
            window.location.href = `${e.target.value}`;
    }
  
    function changeLogin() {
        if(user.nick !== null){
            if(window.confirm("로그아웃 하시겠습니까?")){
                alert("로그아웃이 완료되었습니다.\n비회원 상태에서는 일부 기능이 제한될 수 있습니다.");
                dispatch({ type : '로그아웃' });
                window.location.href = '/home';
            }
        }
        else 
            window.location.href = AUTH_URL;
    }
    
    function clickAlertClose() {
        const modal = document.getElementById("alert-modal");
        modal.style.display = "none";
        document.body.style.overflow = "unset";
    }

    return(
        <>
            <nav className="navbar">
                <a className="navLogo" href='/'> <img id="logoImg" alt="" src = "/img/naviLogo.png"/> </a>
                
                <div id="menu">
                    <button className="navItem" onClick={checkLogin} value="/create"> GAN 사진 변환 </button>
                    <a className="navItem" href='/home'> 미슐간 </a>
                    
                    { user.image 
                    ? <div id="img-wrapper"><img src={user.image} onClick={changeLogin}/> </div> 
                    : <a className="navItem" href={AUTH_URL}> 로그인 </a>
                    }
                </div>
            </nav>

            <div id="alert-modal" className="warning-modal">
                <div className="warning-modal-window">
                    <p className="warning-modal-close" onClick={clickAlertClose}> x </p>
                    
                    <div className="alert-content">
                        <p> 로그인이 필요한 서비스입니다. </p>
                        <a href={AUTH_URL}>
                            <img src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width={"222"} alt="카카오 로그인" />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navigation;

