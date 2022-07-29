import React, { useState } from "react";
import './Navigation.css';
import { AUTH_URL } from '../LoginKey';
import { useSelector } from 'react-redux';

function Navigation() {

    const code = useSelector( (state) => state );
    const [member, setMember] = useState(false);

    function checkLogin () {
        if(code == null){
            alert("로그인이 필요한 서비스입니다.");
            setMember(false);
        }    
        else {
            setMember(true);  
            console.log("로그인 중인 사용자입니다.");
        }
    }

        
    function changeLogin() {
        if(!(code == null)){
            if(window.confirm("로그아웃 하시겠습니까?")){
                alert("로그아웃이 완료되었습니다.\n비회원 상태에서는 일부 기능이 제한될 수 있습니다.");
                code = null;
                setMember(false);
            }
        }
    }
    
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="nav-logo" href = { code ? `/?code=${code}#/` : '/'}>
                <img className="tempLogoImg" alt = "tempLogo" src = "/img/logo.png" width={45}/>
                <span className="navbar-brand mb-0"> MISSUL:GAN </span>
            </a>
            
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link" onClick={ checkLogin } href = { member ? `/?code=${code}#/create` : '/' }> 그림 바꾸기 </a>
                    <a className="nav-item nav-link" onClick={ checkLogin } href = { member ? `/?code=${code}#/home` : '/' }> 작품 둘러보기 </a>
                    <a className="nav-item nav-link" onClick={ checkLogin } href = { member ? `/?code=${code}#/myPage` : '/' }> MY </a>
                    <a className="nav-item nav-link" onClick={ changeLogin } href = { code == null ? AUTH_URL  : '/#/home' }> { code ? "로그아웃" : "로그인" } </a>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;

