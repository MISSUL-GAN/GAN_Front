import React, { useState } from "react";
import { AUTH_URL } from '../LoginKey';
import './UserDrawing.css';

function UserDrawing({ ind, drawing, mine, clickDelete }) {

    const [like, setLike] = useState(false); // 서버에서 받은 정보로 초기값 넣기
    const [bookmark, setBookmark] = useState(false); // 서버에서 받은 정보로 초기값 넣기
    const [seeNFT, setSeeNFT] = useState(true);

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

    function clickAlertClose() {
        const modal = document.getElementById("alert-modal");
        modal.style.display = "none";
        document.body.style.overflow = "unset";
    }

    function clickLike() {
        if (true){
            setLike(!like);

            if(!like){
                drawing.heartCount++;
                // post + /heart/{drawing.id}
            }
            else {
                drawing.heartCount--;
                // delete + /heart/{drawing.id}
            }
        }
        else {
            const modal = document.getElementById("alert-modal");
            modal.style.top = `${window.scrollY}px`;
            modal.style.display = "flex";
        }
    }

    function clickBookmark() {
        if (true){
            setBookmark(!bookmark);

            if(!bookmark){
                drawing.scrapCount++;
                // post + /scrap/{drawing.id}
            }
            else {
                drawing.scrapCount--;
                // delete + /scrap/{drawing.id}
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
                <img src="/img/logo.png" width={100} height="auto" />

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
                    <div className="drawing-modal-left"> <img className="large-drawing" src="/img/logo.png" alt="" /> </div>

                    <div>
                        <p className="drawing-modal-close" onClick={clickClose}> x </p>
                        <div className="drawing-modal-right">
                            <div>
                                <div className="userInfo">
                                    <img src="/img/logo.png" alt="" className="profileImg" width={50} height={50} />
                                    <p className="author">
                                        {drawing.member.userNickname}
                                    </p>
                                </div>

                                <p className="drawing-title"> {drawing.title} </p>

                                <p className="description"> {drawing.description} </p>

                                <div className="drawing-tag">
                                    { drawing.tags.map((t) => <p> #{t.name} </p>)}
                                </div>
                            </div>

                            <div className="buttonBox">
                                <button> <a href="/img/logo.png" download> <img src="/img/downloadIcon.png" width="60px" alt="" /> </a> </button>
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

            <div id="alert-modal" className="warning-modal">
                <div className="warning-modal-window">
                    <p className="warning-modal-close" onClick={clickAlertClose}> x </p>
                    <div className="alert-content">
                        <p> 로그인이 필요한 서비스입니다. </p>

                        <div>
                            <button id="kakaoLogin" onClick={() => { window.location.href = { AUTH_URL }; }}> <img src="/img/kakao.png" alt="" /> </button>
                            <button id="googleLogin" onClick={() => { window.location.href = { AUTH_URL }; }}> <img src="/img/google.png" alt="" /> </button>
                            <button id="naverLogin" onClick={() => { window.location.href = { AUTH_URL }; }}> <img src="/img/naver.png" alt="" /> </button>
                        </div>

                        <div>
                            <p> 카카오 로그인 </p>
                            <p> 구글 로그인 </p>
                            <p> 네이버 로그인 </p>
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