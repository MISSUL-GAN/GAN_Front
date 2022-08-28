import React, { useState, useRef, useEffect } from "react";
import { getHeartMembers, heart, unheart } from "../api/heartApi";
import { getScrapMembers, scrap, unscrap } from "../api/scrapApi";
import { editDrawing } from "../api/drawingApi";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router';
import './DetailModal.css';
import KakaoDrawingShareButton from '../components/KakaoDrawingShareButton';
import { Grow } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import EditTags from "../components/EditTags";
import ReactionList from "./ReactionList";

function DetailModal({ drawing, handleDetailModalClose, openLoginAlert }) {
    const member = useSelector(state => state.member);

    const navigate = useNavigate();

    const { home } = useOutletContext();

    const { clickDelete } = useOutletContext();
    const requestDelete = () => {
        handleDetailModalClose();
        clickDelete(drawing.id);
    }

    const IMG = "https://ipfs.io/ipfs/" + drawing.fileName;

    const [showLikeList, setShowLikeList] = useState(false);
    const handleshowLikeListOpen = () => { setShowLikeList(true); }
    const handleshowLikeListClose = () => { setShowLikeList(false); }

    const [like, setLike] = useState(false);
    const [likeList, setLikeList] = useState([]);
    const clickLike = () => {
        if (member.signed) {
            if (member.id === drawing.member.id)
                alert("본인이 만든 작품에는 좋아요를 누를 수 없습니다.");

            else {
                setLike(!like);

                if (!like) {
                    drawing.heartCount++;
                    heart(drawing.id);
                    setLikeList([member, ...likeList]);
                }
                else {
                    drawing.heartCount--;
                    unheart(drawing.id);
                    setLikeList(likeList.filter(m => m.id !== member.id));
                }
            }
        }
        else
            openLoginAlert();
    }

    const [showScrapList, setShowScrapList] = useState(false);
    const handleshowScrapListOpen = () => { setShowScrapList(true); }
    const handleshowScrapListClose = () => { setShowScrapList(false); }

    const [bookmark, setBookmark] = useState(false);
    const [bookmarkList, setBookmarkList] = useState([]);
    const clickBookmark = () => {
        if (member.signed) {
            if (member.id === drawing.member.id)
                alert("본인이 만든 작품은 스크랩할 수 없습니다.");

            else {
                setBookmark(!bookmark);

                if (!bookmark) {
                    drawing.scrapCount++;
                    scrap(drawing.id);
                    setBookmarkList([member, ...bookmarkList]);
                }
                else {
                    drawing.scrapCount--;

                    if (home){
                        unscrap(drawing.id);
                        setBookmarkList(bookmarkList.filter(m => m.id !== member.id));
                    }
                    else {
                        handleDetailModalClose();
                        clickDelete(drawing.id);
                    }
                }
            }
        }
        else
            openLoginAlert();
    }

    const modalExternalRef = useRef();
    const closeButtonRef = useRef();
    const clickClose = (e) => {
        if (modalExternalRef.current === e.target || closeButtonRef.current === e.target) {
            e.stopPropagation();
            handleDetailModalClose();
        }
    }

    const [seeNFT, setSeeNFT] = useState(true);
    const nftRef = useRef();
    const clickNFT = () => {
        setSeeNFT(!seeNFT);
        nftRef.current.style.display = seeNFT ? "inline" : "none";
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

    const TAGS = [
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
    const STYLE_TAGS = [
        { name: "반 고흐", tagId: 8 },
        { name: "클로드 모네", tagId: 9 },
        { name: "폴 세잔", tagId: 10 },
        { name: "우키요에", tagId: 11 },
    ]

    const [newTagIds, setNewTagIds] = useState(drawing.tags.map((t) => { return t.id }));
    const newTitleRef = useRef();
    const newDescriptionRef = useRef();
    const tagChanged = (e) => {
        const tagId = e.target.value;

        if (newTagIds.includes(parseInt(tagId))) {
            setNewTagIds(newTagIds.filter(id => id !== parseInt(tagId)));
            return true;
        }
        else {
            const isAdding = e.target.checked;
            if (isAdding) {
                if (newTagIds.length < 4) {
                    if (newTagIds.indexOf(tagId) === -1)
                        setNewTagIds([...newTagIds, parseInt(tagId)]);
                    return true;
                }
                e.preventDefault();
                return;
            }
            else {
                setNewTagIds(newTagIds.filter(id => id !== tagId));
                return true;
            }
        }
    }

    const [edit, setEdit] = useState(true);
    const clickEdit = () => { setEdit(!edit); }
    const finishEditing = () => {
        setEdit(!edit);

        let newDrawingInfo = {
            "description": newDescriptionRef.current.value === "" ? drawing.description : newDescriptionRef.current.value,
            "tagIds": newTagIds,
            "title": newTitleRef.current.value === "" ? drawing.title : newTitleRef.current.value
        };

        editDrawing(drawing.id, newDrawingInfo);

        drawing.title = newDrawingInfo.title;
        drawing.description = newDrawingInfo.description;
        drawing.tags = [
            ...TAGS.filter(tag => newTagIds.indexOf(tag.tagId) !== -1),
            ...STYLE_TAGS.filter(tag => newTagIds.indexOf(tag.tagId) !== -1)
        ];
    }

    useEffect(() => {
        async function getDrawingReactions() {
            setLikeList(await getHeartMembers(drawing.id));
            setBookmarkList(await getScrapMembers(drawing.id));
        }
        getDrawingReactions();
    }, []);

    return (
        <div id="modal" className="drawing-modal" onClick={clickClose} ref={modalExternalRef}>
            <Grow in={drawing != null}>
                <div className="drawing-modal-window">
                    <div className="drawing-modal-left"> <img className="large-drawing" src={IMG} alt="" /> </div>

                    <div>
                        <button className="drawing-modal-close" onClick={clickClose}> <img src="/img/closeButton.png" alt="" ref={closeButtonRef} /> </button>
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
                                        <input className="drawing-title" type='text' ref={newTitleRef} style={{ border: "none" }} placeholder={drawing.title} maxLength={8} />
                                    }

                                    {!home && drawing.member.id === member.id &&
                                        <button onClick={clickEdit}> <img style={{ border: "none" }} src={edit ? "/img/editIcon.png" : "/img/editIcon2.png"} width="40px" alt="" /> </button>
                                    }
                                </div>

                                {edit
                                    ?
                                    <>
                                        <p className="description"> {drawing.description} </p>
                                        <div className="drawing-tag"> {drawing.tags.map((t) => <p key={t.id}> #{t.name} </p>)} </div>
                                    </>
                                    :
                                    <>
                                        <textarea className="description" ref={newDescriptionRef} style={{ border: "none", height: "200px" }} placeholder={drawing.description} maxLength={200} />
                                        <div>
                                            <div> 태그를 선택해주세요. (최대 4개)</div>

                                            {STYLE_TAGS
                                                .filter(style => newTagIds.includes(style.tagId))
                                                .map(tag => (
                                                    <label key={tag.tagId}>
                                                        <input name="tagBox" type="checkbox" value={tag.name} disabled />
                                                        <div className="edit-style-tag"> {tag.name} </div>
                                                    </label>
                                                ))
                                            }
                                            
                                            <EditTags tags={TAGS} newTags={newTagIds} tagChanged={tagChanged} />
                                        </div>
                                    </>
                                }
                            </div>

                            <div className="buttonBox">
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

            {showLikeList &&
                <ReactionList count={drawing.heartCount} list={likeList} close={handleshowLikeListClose} like={true}/>
            }
            
            {showScrapList &&
                <ReactionList count={drawing.scrapCount} list={bookmarkList} close={handleshowScrapListClose} like={false}/>
            }
        </div>
    );
}

export default DetailModal;