import React from "react";
import './Navigation.css';
import { Link } from "react-router-dom";

function Navigation() {

    let code = new URL(window.location.href).searchParams.get("code");

    function checkLogin () {
        if(code == null){
            alert("로그인이 필요한 서비스입니다.");
            window.location.href = "#"; { /* 홈 주소로 넣어둠 로그인 페이지로 바로 못 가서 ^^... 하...! */ }
        }
                
        else 
            console.log("로그인 중인 사용자");    
    }
    
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <img className="tempLogo" alt = "tempLogo" src = "/img/logo.png" width={45}/>
            <span className="navbar-brand mb-0"> MISSUL:GAN </span>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link" href="#"> 작품 둘러보기 </a>
                    <a className="nav-item nav-link" onClick={ checkLogin }> 그림 바꾸기 </a>
                    <a className="nav-item nav-link" onClick={ checkLogin }> MY </a>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;

