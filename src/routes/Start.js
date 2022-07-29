import React, { useEffect } from "react";
import './Start.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';

function Start(){

    let code = new URL(window.location.href).searchParams.get("code");
    //const code = useSelector( (state) => state );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: '로그인'})
        if(!(code == null)) {
            axios.post('서버api주소', {
                code : code
            });
            
            console.log(`서버로 다음 인가코드 전송함 : ${code}`);
        }
    }, []);

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
            <div className="goHome">
                <Link to = '/home'>
                    <button type="button" className="btn btn-dark"> 감상하기 </button>
                </Link>
            </div>
        </div>
        </>  
    );
}

export default Start;

