import React, { useEffect } from "react";
import './Start.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Start(){

    const code = useSelector( (state) => state );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: '로그인'})
    }, []);

    return(
        <>
        <div className='background'>

            <div className="jumbotron">
            <h1 className="display-4"> MISSUL;GAN </h1>
            <p className="lead">
                'Missul;GAN'은 GAN 알고리즘을 활용하여 이미지를 변환시켜주고,<br/>
                OpenSea를 통해 NFT를 소장할 수 있게끔 도와주는 서비스입니다.<br/>     
                현재 인가코드 : { code }
            </p>
            </div>

            <br/><br/><br/>
            <div className="goHome">
                <Link to = { code != null ? `home?code=${code}` : '/home'}>
                    <button type="button" className="btn btn-dark"> 감상하기 </button>
                </Link>
            </div>
        </div>
        </>  
    );
}

export default Start;

