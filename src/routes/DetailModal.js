import React, { useState, useRef } from "react";
import { heart, unheart } from "../api/heartApi";
import { scrap, unscrap } from "../api/scrapApi";
import { useSelector } from "react-redux";
import './DetailModal.css';
import KakaoDrawingShareButton from '../components/KakaoDrawingShareButton';

function DetailModal({ drawing, home, clickDelete, handleDetailModalClose, openLoginAlert }) {
    const member = useSelector(state => state.member);

    const [like, setLike] = useState(false);
    const [bookmark, setBookmark] = useState(false);

    const [seeNFT, setSeeNFT] = useState(true);
    const nftRef = useRef();

    const img = "https://api.missulgan.art/image/"+drawing.fileName;

    function clickClose() {
        handleDetailModalClose();
    }

    function clickLike() {
        if (member.signed) {
            if (member.id === drawing.member.id)
                alert("본인이 만든 작품에는 좋아요를 누를 수 없습니다.");

            else {
                setLike(!like);

                if (!like) {
                    drawing.heartCount++;

                    heart(drawing.id);
                }
                else {
                    drawing.heartCount--;
                    unheart(drawing.id);
                }
            }
        }
        else {
            openLoginAlert();
        }
    }

    function clickBookmark() {
        if (member.signed) {
            if (member.id === drawing.member.id)
                alert("본인이 만든 작품은 스크랩할 수 없습니다.");

            else {
                setBookmark(!bookmark);

                if (!bookmark) {
                    drawing.scrapCount++;
                    scrap(drawing.id);
                }
                else {
                    drawing.scrapCount--;
                    if(home) unscrap(drawing.id);
                    else {
                        handleDetailModalClose();
                        clickDelete(drawing.id);
                    }
                }
            }
        }
        else {
            openLoginAlert();
        }
    }

    function clickNFT() {
        setSeeNFT(!seeNFT);
        nftRef.current.style.display = seeNFT ? "inline" : "none";
    }
    
    function requestDelete() {
        handleDetailModalClose();
        clickDelete(drawing.id);
    }

    return (
        <>
            <div id="modal" className="drawing-modal">
                <div className="drawing-modal-window">
                    <div className="drawing-modal-left"> <img className="large-drawing" src={img} alt="" /> </div>

                    <div>
                        <p className="drawing-modal-close" onClick={clickClose}> x </p>
                        <div className="drawing-modal-right">
                            <div>
                                <div className="userInfo">
                                    <img src={drawing.member.profileImage} alt="" className="profileImg" width={50} height={50} />
                                    <p className="author" onClick={() => { window.location.href = "/userPage?member=" + drawing.member.name + "&img=" + drawing.member.profileImage + "&id=" + drawing.member.id }}>
                                        {drawing.member.name}
                                    </p>
                                </div>

                                <p className="drawing-title"> {drawing.title} </p>

                                <p className="description"> {drawing.description} 이 작품은 사람의 간을 본따서 만든 로고인데요 아주 귀엽게 생겼습니다 으아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ </p>

                                <div className="drawing-tag">
                                    {drawing.tags.map((t) => <p> #{t.name} </p>)}
                                </div>
                            </div>

                            <div className="buttonBox">
                                <button style={{ border: "none", backgroundColor: "rgb(0,0,0,0)" }}> <a href="/img/logo.png" download> <img src="/img/downloadIcon.png" width="60px" alt="" /> </a> </button>
                                <KakaoDrawingShareButton drawing={drawing}></KakaoDrawingShareButton>

                                { !home && drawing.member.id === member.id &&
                                    <>
                                        <button> <img src="/img/openseaIcon.png" width="60px" alt="" /> </button>
                                        <button onClick={requestDelete}> <img src="/img/binIcon.png" width="60px" alt="" /> </button>
                                    </>
                                }

                                <button id="open-nft-button" onClick={clickNFT} style={!drawing.nft && {opacity: "0.5", cursor: "not-allowed"}} disabled={!drawing.nft && true}> 
                                    NFT 통계 정보 
                                </button>

                                <div className="likeBox">
                                    <button className="like" onClick={clickLike}> <img src={like ? "/img/Like.png" : "/img/emptyLike.png"} width={32} alt="" /> </button>
                                    <p> {drawing.heartCount} </p>
                                </div>

                                <div className="bookmarkBox">
                                    <button className="bookmark" onClick={clickBookmark}> <img src={bookmark ? "/img/bookmark.png" : "/img/emptyBookmark.png"} width={28} alt="" /> </button>
                                    <p> {drawing.scrapCount} </p>
                                </div>
                            </div>

                            <div className="NFTBox" ref={nftRef}>
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

DetailModal.defaultProps = {
    home: true
}

export default DetailModal;