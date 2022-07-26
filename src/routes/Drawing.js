import React from "react";
import './Drawing.css';

function Drawing({imgsrc, name}){

    var modal;

    function clickImg(){
        modal = document.getElementsByClassName("img-modal");
        var titleText = document.getElementsByClassName("title");
        
        modal[name].style.display = "block";
        titleText.innerHTML = name;
        
    }

    function clickClose() {
        modal[name].style.display = "none";
    }

    return(
        <>
            <img src={imgsrc} width = {250} className="img-thumbnail" onClick = {clickImg}/>
            <p> 그림 {name} </p> 
            
            <div className="img-modal"> 
                <span className="close" onClick={clickClose}> X </span>
                <img className="large-img" src={imgsrc}/> 
                <p className="title"> 그림 {name} ! </p>
            </div>          
        </>
    );
}

export default Drawing;