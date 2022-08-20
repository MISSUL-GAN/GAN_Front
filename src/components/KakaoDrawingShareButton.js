import React, { useEffect, useRef } from "react";

const KakaoDrawingShareButton = ({ drawing }) => {
    const shareBtn = useRef();

    const createKakaoLink = (drawing) => {
        window.Kakao.Link.createCustomButton({
            container: shareBtn.current,
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

    useEffect(() => {
        createKakaoLink(drawing);
    }, [drawing]);

    return (
        <button className="kakao-share-btn" ref={shareBtn}>
            <img src="/img/kakaoIcon.png" width="60px" alt="" />
        </button>
    );
};

export default KakaoDrawingShareButton;