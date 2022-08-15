import React from "react";
import './Start.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Start() {
    const user = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <>
            <div className='background'>
                <Link to='/home'>
                    <button type="button" className="startButton">
                        <img src="/img/startButton.png" />
                    </button>
                </Link>
            </div>
        </>
    );
}

export default Start;

