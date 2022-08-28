import React, { useState, useRef, useEffect } from "react";
import { heart, unheart } from "../api/heartApi";
import { scrap, unscrap } from "../api/scrapApi";
import { getNFTInfo } from "../api/nftApi";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import './DetailModal.css';
import KakaoDrawingShareButton from '../components/KakaoDrawingShareButton';
import { Grow } from "@mui/material";
import { useOutletContext } from "react-router-dom";

function DetailModal({ drawing, handleDetailModalClose, openLoginAlert }) {
    const member = useSelector(state => state.member);

    const { home } = useOutletContext();
    const { clickDelete } = useOutletContext();

    const [like, setLike] = useState(false);
    const [bookmark, setBookmark] = useState(false);

    const [seeNFT, setSeeNFT] = useState(true);
    const nftRef = useRef();
    const [nftInfo, setNftInfo] = useState([]);
    const img = "https://ipfs.io/ipfs/" + drawing.fileName;

    const navigate = useNavigate();

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
                    if (home) unscrap(drawing.id);
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

    const downloadImage = async (e) => {
        try {
            const imageUrl = `https://ipfs.io/ipfs/${drawing.fileName}`;
            const response = await fetch(imageUrl, { method: 'GET' });
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const tempElement = document.createElement('a');
            document.body.appendChild(tempElement);
            tempElement.href = url;
            tempElement.download = "missulgan";
            tempElement.click();
            tempElement.remove();
        }
        catch (e) {
            alert("이미지 다운로드 실패");
        }
    }

    useEffect(() => {
        drawing.nft = {
            "assetContractAddress": "0x381748c76f2b8871afbbe4578781cd24df34ae0d",
            "tokenId": "0"
        };

        async function getDrawingNFTInfo() {
            setNftInfo(await getNFTInfo(drawing.nft.assetContractAddress, drawing.nft.tokenId));
        }

        if (drawing.nft !== null) getDrawingNFTInfo();
    }, []);

    return (
        <div id="modal" className="drawing-modal">
            <Grow in={drawing != null}>
                <div className="drawing-modal-window">
                    <div className="drawing-modal-left"> <img className="large-drawing" src={img} alt="" /> </div>

                    <div>
                        <p className="drawing-modal-close" onClick={clickClose}> x </p>
                        <div className="drawing-modal-right">
                            <div>
                                <div className="userInfo">
                                    <img src={drawing.member.profileImage} alt="" className="profileImg" width={50} height={50} />
                                    <p className="author" onClick={() => { navigate(`/userPage/${drawing.member.id}`); document.body.style.overflow = "visible"; }}>
                                        {drawing.member.name}
                                    </p>
                                </div>

                                <p className="drawing-title"> {drawing.title} </p>

                                <p className="description"> {drawing.description} 이 작품은 사람의 간을 본따서 만든 로고인데요 아주 귀엽게 생겼습니다 으아아아아아아아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ </p>

                                <div className="drawing-tag">
                                    {drawing.tags.map((t) => <p key={t.id}> #{t.name} </p>)}
                                </div>
                            </div>

                            <div className="buttonBox">
                                <div>
                                    <button onClick={downloadImage}> <img src="/img/downloadIcon.png" width="60px" alt="" /> </button>
                                    <KakaoDrawingShareButton drawing={drawing}></KakaoDrawingShareButton>

                                    {!home && drawing.member.id === member.id &&
                                        <>
                                            <button> <img src="/img/openseaIcon.png" width="60px" alt="" /> </button>
                                            <button onClick={requestDelete}> <img src="/img/binIcon.png" width="60px" alt="" /> </button>
                                        </>
                                    }

                                    {nftInfo.length === 0
                                        ?
                                        <button id="open-nft-button" onClick={clickNFT} style={{ opacity: "0.5", cursor: "not-allowed" }} disabled={!drawing.nft && true}> NFT 통계 정보 </button>
                                        :
                                        <button id="open-nft-button" onClick={clickNFT}> NFT 통계 정보 </button>
                                    }

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
                                    {nftInfo.length !== 0 &&
                                        <>
                                            <div> {nftInfo.owner.user.username}님이 소유하고 있는 작품입니다. </div>

                                            <div style={{display:"flex", margin:"10px 0px"}}>
                                            <img src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg" width={20} />
                                            
                                            {nftInfo.collection.stats.one_day_average_price === 0 ?
                                                <> 아직 가격이 정해지지 않은 작품입니다.<br/>아래 링크를 통해 소유자에게 거래를 제안해보세요! </>
                                                :
                                                <>
                                                    <> 1일 평균가 </>
                                                    {nftInfo.collection.stats.one_day_average_price}
                                                    <> ETH </> <br />
                                                </>
                                            }
                                            </div>

                                            <a href={nftInfo.permalink} target="_blank"> openSea에서 보기 </a>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Grow>
        </div>
    );
}

export default DetailModal;