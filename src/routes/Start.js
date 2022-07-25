import React from "react";
import './Start.css';
import { Link } from 'react-router-dom';

function Start(){

    let code = new URL(window.location.href).searchParams.get("code");
    
    return(
        <>
        <div className='background'>

            <div className="jumbotron">
            <h1 className="display-4"> MISSUL;GAN </h1>
            <p className="lead">
                MISSULGAN은 어쩌고저쩌고 뭐하는 서비스입니다. <br/>
                짱 신기하고 멋짐.. 아무튼 사진을 새로운 그림으로 만들어보세요~~ <br/>
                난 진짜 디자인하면 안되겠다. <br/><br/>
                현재 인가코드 : { code }
            </p>
            </div>

            <br/><br/><br/>
            
            { /* 아직 로그인 확인 X 인가코드 존재하면 로그인 한번 눌렀던거니까 갤러리로 보냄 */ }
            <div className="goHome">
                { code == null ? 
                    <Link to = '/login' state={{ code : code }}>
                        <button type="button" className="btn btn-dark"> 감상하기 </button>
                    </Link>
                : 
                    <Link to = '/home' state={{ code : code }}>
                        <button type="button" className="btn btn-dark"> 감상하기 </button>
                    </Link>
                }
            </div>
        </div>
        </>  
    );
}

export default Start;

