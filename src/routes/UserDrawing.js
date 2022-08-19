import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { heart, unheart } from "../api/heartApi";
import './UserDrawing.css';

function UserDrawing({ ind, drawing, mine, clickDelete, clickScrap }) {

    const member = useSelector(state => state.member);
    const [like, setLike] = useState(false); // 서버에서 받은 정보로 초기값 넣기
    const [bookmark, setBookmark] = useState(false); // 서버에서 받은 정보로 초기값 넣기
    const [seeNFT, setSeeNFT] = useState(true);
    const img = "https://api.missulgan.art/image/"+drawing.fileName;

    function clickImg() {
        const modal = document.getElementsByClassName("drawing-modal")[ind];
        modal.style.display = "flex";
        modal.style.top = `${window.scrollY}px`;
        document.body.style.overflow = "hidden";
    }

    function clickClose() {
        const modal = document.getElementsByClassName("drawing-modal")[ind];
        modal.style.display = "none";
        document.body.style.overflow = "unset";
        if (!seeNFT) clickNFT();
    }

    function clickLike() {
        if(member.signed){
            if(member.id === drawing.member.id)
                alert("본인이 만든 작품에는 좋아요를 누를 수 없습니다.");
            
            else {
                if(!like){
                    drawing.heartCount++;
                    heart(drawing.id);
                }
                else {
                    drawing.heartCount--;
                    unheart(drawing.id);
                }
                setLike(!like);
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
                    clickScrap(drawing.id);
                }
                else {
                    drawing.scrapCount--;
                    clickDelete(drawing.id);
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

    function requestDelete() {
        clickClose();
        clickDelete(drawing.id);
    }

    return (
        <>
            <div className="imgwrapper">
                <img src={img} alt=""/>

                <div className="shadow" onClick={clickImg} />

                { mine && <button id="delete" onClick={requestDelete}> <img src="/img/deleteIcon.png" width={28} alt="" /> </button> }
                
                <div className="titleBox">
                    <p className="titleText"> {drawing.title} </p>
                    <div>
                        <button className="like" onClick={clickLike}> <img src={like ? "/img/Like.png" : "/img/whiteLike.png"} width={32} alt="" /> </button>
                        { !mine && <button className="bookmark" onClick={clickBookmark}> <img src={bookmark ? "/img/bookmark.png" : "/img/whiteBookmark.png"} width={28} alt="" /> </button> }
                    </div>
                </div>
            </div>


            <div id="zoom-modal" className="drawing-modal">
                <div className="drawing-modal-window">
                    <div className="drawing-modal-left"> <img className="large-drawing" src={img} alt="" /> </div>

                    <div>
                        <p className="drawing-modal-close" onClick={clickClose}> x </p>
                        <div className="drawing-modal-right">
                            <div>
                                <div className="userInfo">
                                    <img src={drawing.member.profileImage} className="profileImg" width={50} height={50} alt=""/>
                                    <p className="author">
                                        {drawing.member.name}
                                    </p>
                                </div>

                                <p className="drawing-title"> {drawing.title} </p>

                                <p className="description"> {drawing.description} </p>

                                <div className="drawing-tag">
                                    { drawing.tags.map((t) => <p> #{t.name} </p>)}
                                </div>
                            </div>

                            <div className="buttonBox">
                                <button> <a href={img} download> <img src="/img/downloadIcon.png" width="60px" alt="" /> </a> </button>
                                <button> <img src="/img/kakaoIcon.png" width="60px" alt="" /> </button>
                                
                                { mine &&
                                    <>
                                        <button> <img src="/img/openseaIcon.png" width="60px" alt="" /> </button>
                                        <button onClick={requestDelete}> <img src="/img/binIcon.png" width="60px" alt="" /> </button>
                                    </>

                                }
                                
                                <button style={{
                                    backgroundColor: "#3C6B50",
                                    border: "none", borderRadius: "8px",
                                    fontWeight: "200", color: "white",
                                    width: "270px", height: "60px",
                                    marginTop: "8px", marginRight: "30px", marginLeft: "5px"
                                }} onClick={clickNFT}> OpenSea 통계 정보 </button>

                                <div className="likeBox">
                                    <button className="like" onClick={clickLike}> <img src={like ? "/img/Like.png" : "/img/emptyLike.png"} width={32} alt="" /> </button>
                                    <p> {drawing.heartCount} </p>
                                </div>

                                <div className="bookmarkBox">
                                    <button className="bookmark" onClick={clickBookmark}> <img src={bookmark ? "/img/bookmark.png" : "/img/emptyBookmark.png"} width={28} alt="" /> </button>
                                    <p> {drawing.scrapCount} </p>
                                </div>
                            </div>

                            <div className="NFTBox">
                                어쩌고저쩌고<br />
                                이 작품의 NFT 가격!! 247239857198321093원<br />
                                아무튼 통계 정보~~~ 들어갈 자리~~~
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

UserDrawing.defaultProps = {
    mine: false
}

export default UserDrawing;