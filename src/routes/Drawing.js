import axios from "axios";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import './Drawing.css';

function Drawing({ind, drawing}){

    const member = useSelector(state => state.member);
    const accessToken = useSelector(state => state.token.accessToken);
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

    function clickLike() {
        if(member.signed){
            if(member.id === drawing.member.id)
                alert("본인이 만든 작품에는 좋아요를 누를 수 없습니다.");
            
            else {
                setLike(!like);

                if(!like){
                    drawing.heartCount++;
    
                    axios.post(`/heart/${drawing.id}`, {
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                        }
                    });
                }
                else {
                    drawing.heartCount--;
                    
                    axios.delete(`/heart/${drawing.id}`, {
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                        }
                    });
                }
            }
        }
        else {
            const modal = document.getElementById("alert-modal");
            modal.style.top = `${window.scrollY}px`;
            modal.style.display = "flex";
        }
    }

    function clickBookmark() {
        if (member.signed){
            if(member.id === drawing.member.id)
                alert("본인이 만든 작품은 스크랩할 수 없습니다.");

            else {
                setBookmark(!bookmark);

                if(!bookmark){
                    drawing.scrapCount++;
    
                    axios.post(`/scrap/${drawing.id}`, {
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                        }
                    });
                }
                else {
                    drawing.scrapCount--;
    
                    axios.delete(`/scrap/${drawing.id}`, {
                        headers: {
                          Authorization: `Bearer ${accessToken}`,
                        }
                    });
                }
            }
        }
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
                                <p className="author" onClick={() => { window.location.href="/userPage?member="+drawing.member.userNickname+"&img="+drawing.member.profileImage+"&id="+drawing.member.id}}> 
                                    {drawing.member.userNickname} 
                                </p>
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
                                    <p> {drawing.heartCount} </p>
                                </div>

                                <div className="bookmarkBox">
                                    <button className="bookmark" onClick={ clickBookmark }> <img src={bookmark ? "/img/bookmark.png" : "/img/emptyBookmark.png"} width={28} alt=""/> </button>
                                    <p> {drawing.scrapCount} </p>
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
        </>
    );
}

export default Drawing;