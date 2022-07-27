import React, { useState } from "react";
import './Navigation.css';

function Navigation() {

    let code = new URL(window.location.href).searchParams.get("code");
    const [member, setMember] = useState(false);

    function checkLogin () {
        if(code == null){
            alert("로그인이 필요한 서비스입니다.");
            setMember(false);
        }    
        else {
            console.log("로그인 중인 사용자입니다.");
            setMember(true);  
        }
    }

        
    function changeLogin() {
        if(code == null){
            alert("로그인 하시겠습니까? 근데 굳이 물어봐야 되나 이걸??? 걍 이동하면 될듯");
            setMember(false);
        }
        else {
            alert("로그아웃 하시겠습니까?");
            code = null;
        }
        
    }
    
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="nav-logo" onClick={ checkLogin } href = { member ? `/?code=${code}#/` : '/'}>
                <img className="tempLogoImg" alt = "tempLogo" src = "/img/logo.png" width={45}/>
                <span className="navbar-brand mb-0"> MISSUL:GAN </span>
            </a>
            
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link" onClick={ checkLogin } href = { member ? `/?code=${code}#/create` : '/' }> 그림 바꾸기 </a>
                    <a className="nav-item nav-link" onClick={ checkLogin } href = { member ? `/?code=${code}#/home` : '/' }> 작품 둘러보기 </a>
                    <a className="nav-item nav-link" onClick={ checkLogin } href = { member ? `/?code=${code}#/myPage` : '/' }> MY </a>
                    <a className="nav-item nav-link" onClick={ changeLogin } href = "/"> { code ? "로그아웃" : "로그인" } </a>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;

