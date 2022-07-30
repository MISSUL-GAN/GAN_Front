import React, { useState } from "react";
import './Drawing.css';

function Drawing({imgsrc, name}){

    var modal;
    const [like, setLike] = useState(false);
    const [bookmark, setBookmark] = useState(false);

    function clickImg(){
        modal = document.getElementsByClassName("img-modal");
        var titleText = document.getElementsByClassName("title");
        
        modal[name].style.display = "block";
        titleText.innerHTML = name;
        
    }

    function clickClose() {
        modal[name].style.display = "none";
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
                <img src={imgsrc} width = {250} className="img-thumbnail" onClick = {clickImg}/>
                <p> 그림 {name} </p> 
                <button className="like" onClick={ clickLike }> { like ? "♥" : "♡"} </button>
                <button className="bookmark" onClick={ clickBookmark }> { bookmark ? "스크랩 취소" : "스크랩" } </button>
            </div>
            
            <div className="img-modal"> 
                <span className="close" onClick={clickClose}> x </span>
                <img className="large-img" src={imgsrc}/> 
                <p className="title"> 그림 {name} 제목입니다,,, </p>
                <br/>
                <p className="Description"> 그림 {name} 설명입니다,,, </p>
            </div>          
        </>
    );
}

export default Drawing;