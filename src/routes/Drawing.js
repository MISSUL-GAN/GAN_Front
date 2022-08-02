import React, { useState } from "react";
import './Drawing.css';

function Drawing({imgsrc, name}){

    const [like, setLike] = useState(false);
    const [bookmark, setBookmark] = useState(false);

    function clickImg(){
        const modal = document.getElementById("zoom-modal");
        modal.style.display = "flex";

        document.body.style.overflow = "hidden";
        console.log(name);
    }

    function clickClose() {
        const modal = document.getElementById("zoom-modal");
        modal.style.display = "none";
        document.body.style.overflow = "unset";
    }

    function clickLike() {
        setLike(!like);
    }

    function clickBookmark() {
        setBookmark(!bookmark);
    }

    return(
        <>
            <div>
                <img src={imgsrc} alt="" className="img-thumbnail" onClick = {clickImg}/>
                <p> 그림 {name} </p> 
                <button className="like" onClick={ clickLike }> { like ? "♥" : "♡"} </button>
                <button className="bookmark" onClick={ clickBookmark }> { bookmark ? "스크랩 취소" : "스크랩" } </button>
            </div>

            <div id="zoom-modal" className="drawing-modal">
                <div className="drawing-modal-window">
                    <img className="large-drawing" src={imgsrc} alt=""/>
                    <div className="details">
                        <p className="drawing-modal-close" onClick={clickClose}> x </p>
                        <div className="userInfo">
                            <img src={imgsrc} alt="" width={70}/>
                            <p className="author"> 사용자 닉네임 </p>
                        </div>
                        
                        <p className="drawing-title"> 제목길이제한8자 </p>
                        <p className="description"> 그림 {name} 설명입니다 이 작품은 사람의 간을 본따서 만든 로고인데요 아주 귀엽게 생겼습니다 </p>
                    </div>
                </div>
            </div>          
        </>
    );
}

export default Drawing;