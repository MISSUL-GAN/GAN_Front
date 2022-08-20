import React, { useEffect, useRef } from "react";

const KakaoDrawingShareButton = ({ drawing }) => {
    
    const shareBtn = useRef();

    console.log(drawing);

    const createKakaoLink = (drawing) => {
        window.Kakao.Link.createCustomButton({
            container: `#drawing-${drawing.id}`,
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
        <button className="kakao-share-btn" id={`drawing-${drawing.id}`}>
            <img src="/img/kakaoIcon.png" width="60px" alt="" />
        </button>
    );
};

export default KakaoDrawingShareButton;