import React from "react";
import './Start.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Start(){
    const user = useSelector( (state) => state );
    const dispatch = useDispatch();

    return(
        <>
        <div className='background'>
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

