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
            setMember(true);  
        }
    }
    
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <img className="tempLogo" alt = "tempLogo" src = "/img/logo.png" width={45}/>
            <span className="navbar-brand mb-0"> MISSUL:GAN </span>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link" onClick={ checkLogin } href = { member ? `/?code=${code}#/home` : '/' }> 작품 둘러보기 </a>
                    <a className="nav-item nav-link" onClick={ checkLogin } href = { member ? `/?code=${code}#/create` : '/' }> 그림 바꾸기 </a>
                    <a className="nav-item nav-link" onClick={ checkLogin } href = { member ? `/?code=${code}#/myPage` : '/' }> MY </a>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;

