import React, { useState } from "react";
import './Drawing.css';
import { useSelector } from 'react-redux';
import { AUTH_URL } from '../LoginKey';

function Drawing({imgsrc, name}){

    const code = useSelector( (state) => state );
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

    function clickAlertClose() {
        const modal = document.getElementById("alert-modal");
        modal.style.display = "none";
        document.body.style.overflow = "unset";
    }

    function clickLike() {
        if(code !== null) 
            setLike(!like);
        
        else {
            const modal = document.getElementById("alert-modal");
            modal.style.display = "flex";
        }
    }

    function clickBookmark() {
        if(code !== null) 
            setBookmark(!bookmark);
    
        else {
            const modal = document.getElementById("alert-modal");
            modal.style.display = "flex";
        }
    }

    function clickNFT() {
        setSeeNFT(!seeNFT);
        const NFTInfo = document.getElementsByClassName("NFTBox")[0];
        let see = seeNFT ? "inline" : "none";
        NFTInfo.style.display = see;
    }

    return(
        <>
            <div className="drawing">
                <img src={imgsrc} alt="" className="img-thumbnail" onClick = {clickImg}/>
                <div className="titleBox">
                    <p> 그림 {name} </p> 
                    <div>
                        <button className="like" onClick={ clickLike }> <img src={like ? "/img/Like.png" : "/img/emptyLike.png"} width={32}/> </button>
                        <button className="bookmark" onClick={ clickBookmark }> <img src={bookmark ? "/img/bookmark.png" : "/img/emptyBookmark.png"} width={28}/> </button>
                    </div>
                </div>
             </div>

            <div id="zoom-modal" className="drawing-modal">
                <div className="drawing-modal-window">
                    <div className="drawing-modal-left"> <img className="large-drawing" src={imgsrc} alt=""/> </div>
                
                    <div>
                        <p className="drawing-modal-close" onClick={clickClose}> x </p>
                        <div className="drawing-modal-right">
                            
                            <div className="userInfo">
                                <img src={imgsrc} alt="" className="profileImg" width={50} height={50}/>
                                <p className="author"> 사용자 닉네임 </p>
                            </div>
                            
                            <p className="drawing-title"> 제목길이제한8자 </p>

                            <p className="description"> 그림 {name} 설명입니다 이 작품은 사람의 간을 본따서 만든 로고인데요 아주 귀엽게 생겼습니다 으아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ </p>
                        
                            <p className="drawing-tag"> #태그1 #태그2 #태그3 </p>
                            
                            <div className="buttonBox">
                                <button style={{border:"none"}}> <a href="/img/logo.png" download> <img src="/img/downloadIcon.png" width="60px"/> </a> </button>
                                <button style={{border:"none"}}> <img src="/img/kakaoIcon.png" width="60px"/> </button>
                                
                                <button style={{
                                    backgroundColor: "#3C6B50", 
                                    border:"none", borderRadius:"8px", 
                                    fontWeight:"200", color:"white",
                                    width:"270px", marginRight:"30px", marginLeft:"5px"
                                }} onClick={ clickNFT }> OpenSea 통계 정보 </button>

                                <button className="like" onClick={ clickLike }> <img src={like ? "/img/Like.png" : "/img/emptyLike.png"} width={32}/> </button>
                                <button className="bookmark" onClick={ clickBookmark }> <img src={bookmark ? "/img/bookmark.png" : "/img/emptyBookmark.png"} width={28}/> </button>
                            </div>

                            <div className="NFTBox">
                                통계정보... 이 작품은 https://opensea.com/fgijsdifg 에 등록된거고..<br/>
                                가격은 몇 이더리움이고.. 근데 난 코인 안 해서 잘 모르겟음 ㅋㅋ<br/>
                                음 네 뭐 그렇습니다.......... 어쩌고저쩌고
                            </div>
                        </div>
                    </div>
                </div>
            </div>        

            <div id="alert-modal" className="warning-modal">
                <div className="warning-modal-window">
                    <p className="warning-modal-close" onClick={clickAlertClose}> x </p>
                    <div className="alert-content">
                        <p> 로그인이 필요한 서비스입니다. </p>
                        <a href={AUTH_URL}> <img src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width={"222"} alt="카카오 로그인" /> </a>
                    </div>
                </div>
            </div>  
        </>
    );
}

export default Drawing;