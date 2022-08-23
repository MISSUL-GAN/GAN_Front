import React, { useState, useRef, useEffect } from "react";
import { heart, unheart } from "../api/heartApi";
import { scrap, unscrap } from "../api/scrapApi";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import './DetailModal.css';
import KakaoDrawingShareButton from '../components/KakaoDrawingShareButton';
import { Grow, styled, Tooltip, tooltipClasses  } from "@mui/material";
import { useOutletContext } from "react-router-dom";

const NFTTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow placement="top-start" classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
        color: "white",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))"
    },
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
        padding: "12px 16px",
        maxWidth: 220,
        fontFamily: 'Spoqa Han Sans Neo',
        fontWeight: 500,
        fontSize: "12px",
        borderRadius: "8px",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15))"
    },
}));

function DetailModal({ drawing, handleDetailModalClose, openLoginAlert }) {
    const member = useSelector(state => state.member);

    const navigate = useNavigate();

    const { home } = useOutletContext();
    const { clickDelete } = useOutletContext();

    const img = "https://ipfs.io/ipfs/"+drawing.fileName;

    const [like, setLike] = useState(false);
    const [bookmark, setBookmark] = useState(false);

    const [tagIds, setTagIds] = useState(drawing.tags.map((t) => {return t.id})); // useState([]);

    const [seeNFT, setSeeNFT] = useState(true);
    const nftRef = useRef();

    const titleRef = useRef();
    const descriptionRef = useRef();
    const [edit, setEdit] = useState(true);
 
    const tags = [
        { name: "어두운", tagId: 1 },
        { name: "화사한", tagId: 2 },
        { name: "다채로운", tagId: 3 },
        { name: "차분한", tagId: 4 },
        { name: "강렬한", tagId: 5 },
        { name: "차가운", tagId: 6 },
        { name: "따뜻한", tagId: 7 },
        { name: "풍경", tagId: 12 },
        { name: "동물", tagId: 13 },
        { name: "인물", tagId: 14 },
        { name: "기타", tagId: 15 },
    ];

    const tagChanged = (e) => {
        const tagId = e.target.value;

        if (tagIds.includes(parseInt(tagId))) {
            setTagIds(tagIds.filter(id => id !== parseInt(tagId)));
            return true;
        }
        else {
            const isAdding = e.target.checked;
            if (isAdding) {
                if (tagIds.length < 3) {
                    if (tagIds.indexOf(tagId) === -1)
                        setTagIds([...tagIds, parseInt(tagId)]);
                    return true;
                }
                e.preventDefault();
                return;
            }
            else {
                setTagIds(tagIds.filter(id => id !== tagId));
                return true;
            }
        }
    }

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

    const clickEdit = () => {
        setEdit(!edit);

        if(!edit) {
            console.log(titleRef.current.value);
            console.log(descriptionRef.current.value);
            console.log(tagIds);
        }
    }

    return (
        <div id="modal" className="drawing-modal">
            <Grow in={drawing}>
                <div className="drawing-modal-window">
                    <div className="drawing-modal-left"> <img className="large-drawing" src={img} alt="" /> </div>

                    <div>
                        <button className="drawing-modal-close" onClick={clickClose}> <img src="/img/closeButton.png" alt=""/> </button>
                        <div className="drawing-modal-right">
                            <div>
                                <div className="userInfo">
                                    <img src={drawing.member.profileImage} alt="" className="profileImg" width={50} height={50} />
                                    <p className="author" onClick={() => { navigate(`/userPage/${drawing.member.id}`); document.body.style.overflow = "visible"; }}>
                                        {drawing.member.name}
                                    </p>
                                </div>

                                <div id="testTitleBox">
                                    {edit
                                        ?
                                        <div className="drawing-title"> {drawing.title} </div>
                                        :
                                        <input className="drawing-title" type='text' ref={titleRef} style={{ border: "none" }} placeholder={drawing.title} maxLength={8}/>
                                    }

                                    {!home && drawing.member.id === member.id &&
                                        <button onClick={clickEdit}> <img style={{border:"none"}} src={edit ? "/img/editIcon.png" : "/img/editIcon2.png"} width="40px" alt="" /> </button>
                                    }
                                </div>    

                                {edit
                                    ?
                                    <>
                                        <p className="description"> {drawing.description} </p>
                                        <div className="drawing-tag"> {drawing.tags.map((t) => <p> #{t.name} </p>)} </div>
                                    </>
                                    :
                                    <>
                                        <textarea className="description" ref={descriptionRef} style={{ border: "none", height: "250px" }} placeholder={drawing.description} maxLength={200} />
                                        <div>
                                        { tags.map(tag => {
                                                if (tagIds.includes(tag.tagId))
                                                    return (
                                                        <label key={tag.tagId}>
                                                            <input name="tagBox" type="checkbox" value={tag.tagId} onClick={tagChanged} checked/>
                                                            <div className="tag">{tag.name}</div>
                                                        </label>
                                                    )
                                                else
                                                    return (
                                                        <label key={tag.tagId}>
                                                            <input name="tagBox" type="checkbox" value={tag.tagId} onClick={tagChanged} />
                                                            <div className="tag">{tag.name}</div>
                                                        </label>
                                                    )
                                            }
                                            )}
                                        </div>
                                    </>
                                }

                                
                            </div>

                            <div className="buttonBox">
                                <button onClick={downloadImage}> <img src="/img/downloadIcon.png" width="60px" alt="" /> </button>
                                <KakaoDrawingShareButton drawing={drawing}></KakaoDrawingShareButton>

                                { !home && drawing.member.id === member.id &&
                                    <>
                                    <NFTTooltip
                                        title={
                                            <React.Fragment>
                                                당신의 작품을 NFT로 등록해보세요!
                                            </React.Fragment>
                                        }
                                        className="NFTButton"
                                    >
                                        <button className="NFTButton"><img src="/img/openseaIcon.png" width="60px" alt="" /> </button>
                                    </NFTTooltip>
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
            </Grow>
        </div>
    );
}

export default DetailModal;