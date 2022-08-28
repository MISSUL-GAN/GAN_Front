import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './ReactionList.css';

function ReactionList({ count, list, close, like }) {
    const textRef = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        if(like)
            textRef.current.innerHTML = `${count}명이 이 작품을 좋아합니다.`;
        else
            textRef.current.innerHTML = `${count}명이 이 작품을 스크랩합니다.`
    }, []);

    return (
        <div id="listModal-background">
            <div id="listModal">
                <div id="info-box">
                    <div ref={textRef} />
                    <img id="list-modal-close" src="/img/closeButton.png" width="25" alt="" onClick={close} />
                </div>
                <hr />

                {list.map(i =>
                    <>
                        <div id="user-info">
                            <img src={i.profileImage} alt="" />
                            <div onClick={() => {navigate(`/userPage/${i.id}`);}}> {i.name} </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ReactionList;