import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { heart, unheart } from "../api/heartApi";
import './UserDrawing.css';

function UserDrawing({ drawing, mine, clickDelete, clickScrap, openDetailModal, openLoginAlert }) {
    const member = useSelector(state => state.member);

    const [like, setLike] = useState(drawing.didHeart);
    const [bookmark, setBookmark] = useState(drawing.didScrap); 

    const img = `https://${drawing.fileName}.ipfs.nftstorage.link`;

    function clickImg() {
        openDetailModal(drawing);
    }

    function clickLike() {
        if (member.signed) {
            if (drawing.member.id === member.id)
                alert("본인이 만든 작품에는 좋아요를 누를 수 없습니다.");

            else {
                if (!like) {
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
            openLoginAlert();
        }
    }

    function clickBookmark() {
        if (member.signed) {
            if (drawing.member.id === member.id)
                alert("본인이 만든 작품은 스크랩할 수 없습니다.");

            else {
                setBookmark(!bookmark);

                if (!bookmark) {
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
            openLoginAlert();
        }
    }

    function requestDelete() {
        clickDelete(drawing.id);
    }

    return (
        <>
            <div className="imgwrapper">
                <img src={img} alt="" />

                <div className="shadow" onClick={clickImg} />

                {mine && <button id="delete" onClick={requestDelete}> <img src="/img/deleteIcon.png" width={28} alt="" /> </button>}

                <div className="titleBox">
                    <p className="titleText"> {drawing.title} </p>
                    <div>
                        {!mine &&
                            <>
                                <button className="like" onClick={clickLike}> <img src={like ? "/img/Like.png" : "/img/whiteLike.png"} width={32} alt="" /> </button>
                                <button className="bookmark" onClick={clickBookmark}> <img src={bookmark ? "/img/bookmark.png" : "/img/whiteBookmark.png"} width={28} alt="" /> </button>
                            </>

                        }
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