import React from "react";
import './Start.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Start() {
    const user = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        <div className="background">
            <div id="content-box">
                <div id="leftBox">
                    <img src="img/start-logo.png" id="logo" alt=""/>
                    <img src="img/start-description.png" id="description" alt=""/>

                    <div id="buttonBox">
                    <Link to='/home'>
                        <button type="button">
                            <img src="/img/startButton.png" id="start-button" alt=""/>
                        </button>
                    </Link>
                    </div>
                </div>

                <div id="rightBox">
                    <img src="img/start-image.png" id="image" alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Start;