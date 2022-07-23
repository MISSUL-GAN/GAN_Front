import React from "react";
import './Start.css';
import { Link } from 'react-router-dom';

function Start(){
    return(
        <>
        <div className='background'>
            <div className="siteInfo">
                MISSUL;GAN은 어쩌고저쩌고 뭐하는 서비스입니다. <br/>
                짱 신기하고 멋짐.. 아무튼 사진을 새로운 그림으로 만들어보세요~~ <br/>
                난 진짜 디자인하면 안되겠다.
            </div> 

            <br/><br/><br/>
            
            <div className="goHome">
                <Link to = '/login'>
                감상하기
                </Link>
            </div>
        </div>
        </>  
    );
}

export default Start;