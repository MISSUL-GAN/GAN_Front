import React, { useEffect }  from "react";
import Navigation from "../components/Navigation";
import './UserPage.css';

function UserPage() {
    const member = {
        nick: new URL(window.location.href).searchParams.get("member"),
        img: new URL(window.location.href).searchParams.get("img"),
        id: new URL(window.location.href).searchParams.get("id")
    };

    useEffect(() => {
        // /drawing/{member.id} 요청해서 그 사용자의 그림 다 받아오기
    }, []);

    return(
        <>
        <Navigation/>
        
        <div id="page-content">
            <div> <img src={member.img} alt=""/> </div>
            <div> {member.nick} </div>
            <hr/>

            <div id="drawingBox">
            그림 가져다가 띄울 자리
            </div>
        </div>
        </>
    );
}

export default UserPage;