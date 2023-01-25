import { Grow, Slide, Zoom } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { heart, unheart } from "../api/heartApi";
import { scrap, unscrap } from "../api/scrapApi";
import './Drawing.css';

function Drawing({ drawing, openLoginAlert }) {
    const member = useSelector(state => state.member);
    const navigate = useNavigate();

    const [like, setLike] = useState(drawing.didHeart);
    const [bookmark, setBookmark] = useState(drawing.didScrap);

    const image = `https://${drawing.fileName}.ipfs.nftstorage.link`;

    function clickImg() {
        navigate(`${drawing.id}`);
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

                    unscrap(drawing.id);
                }
            }
        }
        else {
            openLoginAlert();
        }
    }

    return (
        <Zoom in={true}>
            <div className="drawing-container">
                <div className="drawing">
                    <div id="img-thumbnail-wrapper" onClick={clickImg}> <img src={image} alt="" className="img-thumbnail" /> </div>
                    <div className="titleBox">
                        <p> {drawing.title} </p>
                        <div>
                            <button className="like" onClick={clickLike}> <img src={like ? "/img/Like.png" : "/img/emptyLike.png"} width={32} alt="" /> </button>
                            <button className="bookmark" onClick={clickBookmark}> <img src={bookmark ? "/img/bookmark.png" : "/img/emptyBookmark.png"} width={28} alt="" /> </button>
                        </div>
                    </div>
                </div>
            </div>
        </Zoom>
    );
}

export default Drawing;