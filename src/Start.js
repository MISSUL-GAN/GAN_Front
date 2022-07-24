import React from "react";
import './Start.css';
import { Link } from 'react-router-dom';

function Start(){

    let code = new URL(window.location.href).searchParams.get("code");

    return(
        <>
        <div className='background'>
            <div className="siteInfo">
                MISSUL;GAN은 어쩌고저쩌고 뭐하는 서비스입니다. <br/>
                짱 신기하고 멋짐.. 아무튼 사진을 새로운 그림으로 만들어보세요~~ <br/>
                난 진짜 디자인하면 안되겠다. <br/><br/>
                현재 인가코드 : { code }
            </div> 

            <br/><br/><br/>
            
            <div className="goHome">
                <Link to = '/login' state={{ code : code }}>
                감상하기
                </Link>
            </div>
        </div>
        </>  
    );
}

export default Start;