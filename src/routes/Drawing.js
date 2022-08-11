import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { AUTH_URL } from '../LoginKey';
import './Drawing.css';

function Drawing({ind, drawing}){

    const code = useSelector( (state) => state );
    const [like, setLike] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [seeNFT, setSeeNFT] = useState(true);

    function clickImg(){
        const modal = document.getElementsByClassName("drawing-modal")[ind];
        modal.style.display = "flex";
        modal.style.top = `${window.scrollY}px`;
        document.body.style.overflow = "hidden";
    }

    function clickClose() {
        const modal = document.getElementsByClassName("drawing-modal")[ind];
        modal.style.display = "none";
        document.body.style.overflow = "unset";
        if(!seeNFT) clickNFT();
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
            modal.style.top = `${window.scrollY}px`;
            modal.style.display = "flex";
        }
    }

    function clickBookmark() {
        if(code !== null) 
            setBookmark(!bookmark);
    
        else {
            const modal = document.getElementById("alert-modal");
            modal.style.top = `${window.scrollY}px`;
            modal.style.display = "flex";
        }
    }

    function clickNFT() {
        setSeeNFT(!seeNFT);
        const NFTInfo = document.getElementsByClassName("NFTBox")[ind];
        let see = seeNFT ? "inline" : "none";
        NFTInfo.style.display = see;
    }

    return(
        <>
            <div className="drawing">
                <div id="img-thumbnail-wrapper"> <img src={drawing.member.profileImage} alt="" className="img-thumbnail" onClick = {clickImg}/> </div>
                <div className="titleBox">
                    <p> {drawing.title} </p> 
                    <div>
                        <button className="like" onClick={ clickLike }> <img src={like ? "/img/Like.png" : "/img/emptyLike.png"} width={32} alt=""/> </button>
                        <button className="bookmark" onClick={ clickBookmark }> <img src={bookmark ? "/img/bookmark.png" : "/img/emptyBookmark.png"} width={28} alt=""/> </button>
                    </div>
                </div>
             </div>

            <div id="zoom-modal" className="drawing-modal">
                <div className="drawing-modal-window">
                    <div className="drawing-modal-left"> <img className="large-drawing" src={drawing.member.profileImage} alt=""/> </div>
                
                    <div>
                        <p className="drawing-modal-close" onClick={clickClose}> x </p>
                        <div className="drawing-modal-right">
                            <div>
                            <div className="userInfo">
                                <img src={drawing.member.profileImage} alt="" className="profileImg" width={50} height={50}/>
                                <p className="author"> {drawing.member.profileNickname} </p>
                            </div>
                            
                            <p className="drawing-title"> {drawing.title} </p>

                            <p className="description"> {drawing.description} 이 작품은 사람의 간을 본따서 만든 로고인데요 아주 귀엽게 생겼습니다 으아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ </p>
                        
                            <div className="drawing-tag">
                                { drawing.tags.map((t) => <p> #{t.name} </p>)}
                            </div>
                            </div>
                            
                            <div className="buttonBox">
                                <button style={{border:"none", backgroundColor:"rgb(0,0,0,0)"}}> <a href="/img/logo.png" download> <img src="/img/downloadIcon.png" width="60px" alt=""/> </a> </button>
                                <button style={{border:"none", backgroundColor:"rgb(0,0,0,0)"}}> <img src="/img/kakaoIcon.png" width="60px" alt=""/> </button>
                                
                                <button style={{
                                    backgroundColor: "#3C6B50", 
                                    border:"none", borderRadius:"8px", 
                                    fontWeight:"200", color:"white",
                                    width:"270px", height:"60px",
                                    marginTop:"8px", marginRight:"30px", marginLeft:"5px"
                                }} onClick={ clickNFT }> OpenSea 통계 정보 </button>

                                <div className="likeBox">
                                    <button className="like" onClick={ clickLike }> <img src={like ? "/img/Like.png" : "/img/emptyLike.png"} width={32} alt=""/> </button>
                                    <p> 1234 </p>
                                </div>

                                <div className="bookmarkBox">
                                    <button className="bookmark" onClick={ clickBookmark }> <img src={bookmark ? "/img/bookmark.png" : "/img/emptyBookmark.png"} width={28} alt=""/> </button>
                                    <p> 1234 </p>
                                </div>
                            </div>

                            <div className="NFTBox">
                                어쩌고저쩌고<br/>
                                이 작품의 NFT 가격!! 247239857198321093원<br/>
                                아무튼 통계 정보~~~ 들어갈 자리~~~
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