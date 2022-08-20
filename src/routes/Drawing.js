import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { heart, unheart } from "../api/heartApi";
import { scrap, unscrap } from "../api/scrapApi";
import './Drawing.css';

function Drawing({ ind, drawing, openDetailModal, openLoginAlert }){
    const member = useSelector(state => state.member);

    const [like, setLike] = useState(false);
    const [bookmark, setBookmark] = useState(false);

    function clickImg(){
        openDetailModal(ind);
    }

    function clickLike() {
        if(member.signed){
            if(member.id === drawing.member.id)
                alert("본인이 만든 작품에는 좋아요를 누를 수 없습니다.");
            
            else {
                setLike(!like);

                if(!like){
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
        if (member.signed){
            if(member.id === drawing.member.id)
                alert("본인이 만든 작품은 스크랩할 수 없습니다.");

            else {
                setBookmark(!bookmark);

                if(!bookmark){
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
        </>
    );
}

export default Drawing;