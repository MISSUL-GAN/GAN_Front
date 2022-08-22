import React from "react";

const KakaoDrawingShareButton = ({ drawing }) => {

    const sendShare = (drawing) => {
        window.Kakao.Link.sendCustom({
            templateId: 80454,
            templateArgs: {
                drawingId: drawing.id,
                drawingImage: `https://api.missulgan.art/image/${drawing.fileName}`,
                title: drawing.title,
                description: drawing.description,
                heartCount: drawing.heartCount,
                scrapCount: drawing.scrapCount
            }
        });
    };

    const clickShare = () => {
        sendShare(drawing);
    };

    return (
        <button className="kakao-share-btn" onClick={clickShare}>
            <img src="/img/kakaoIcon.png" width="60px" alt="" />
        </button>
    );
};

export default KakaoDrawingShareButton;