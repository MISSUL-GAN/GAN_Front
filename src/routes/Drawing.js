import React, { useState } from "react";
import './Drawing.css';

function Drawing({imgsrc, name}){

    const [like, setLike] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [seeNFT, setSeeNFT] = useState(true);

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

    function clickNFT() {
        setSeeNFT(!seeNFT);
        const NFTInfo = document.getElementsByClassName("NFTBox")[0];
        let see = seeNFT ? "inline" : "none";
        NFTInfo.style.display = see;
    }

    return(
        <>
            <div>
                <img src={imgsrc} alt="" className="img-thumbnail" onClick = {clickImg}/>
                <div className="titleBox">
                    <p> 그림 {name} </p> 
                    <button className="like" onClick={ clickLike }> { like ? "♥" : "♡"} </button>
                    <button className="bookmark" onClick={ clickBookmark }> { bookmark ? "스크랩 취소" : "스크랩" } </button>
                </div>
             </div>

            <div id="zoom-modal" className="drawing-modal">
                <div className="drawing-modal-window">
                    <img className="large-drawing" src={imgsrc} alt=""/>
                    <div className="details">
                        <p className="drawing-modal-close" onClick={clickClose}> x </p>
                        <div className="userInfo">
                            <img src={imgsrc} alt="" className="profileImg" width={50} height={50}/>
                            <p className="author"> 사용자 닉네임 </p>
                        </div>
                        
                        <p className="drawing-title"> 제목길이제한8자 </p>
                        <p className="description"> 그림 {name} 설명입니다 이 작품은 사람의 간을 본따서 만든 로고인데요 아주 귀엽게 생겼습니다 으아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ </p>
                    
                    
                        <div className="buttonBox">
                            <button> 다운로드 </button>
                            <button> 카톡 공유 </button>
                            <button onClick={ clickNFT }> OpenSea 통계 정보 </button>
                            <button className="like" onClick={ clickLike }> { like ? "♥" : "♡"} </button>
                            <button className="bookmark" onClick={ clickBookmark }> { bookmark ? "스크랩 취소" : "스크랩" } </button>
                        </div>

                        <div className="NFTBox">
                            <br/>
                            통계정보... 이 작품은 https://opensea.com/fgijsdifg 에 등록된거고..<br/>
                            가격은 몇 이더리움이고.. 근데 난 코인 안 해서 잘 모르겟음 ㅋㅋ<br/>
                            음 네 뭐 그렇습니다.......... 어쩌고저쩌고
                        </div>

                    </div>
                </div>
            </div>          
        </>
    );
}

export default Drawing;