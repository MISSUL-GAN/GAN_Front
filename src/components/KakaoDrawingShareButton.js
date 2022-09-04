import React from "react";

const KakaoDrawingShareButton = ({ drawing }) => {

    const sendShare = async () => {
        const imageUrl = `https://ipfs.io/ipfs/${drawing.fileName}`;
        const response = await fetch(imageUrl, { method: 'GET' });
        const blob = await response.blob();
        const { url: kakaoUploadUrl } = (await window.Kakao.Share.uploadImage({ file: [blob] }))
            .infos.original;
        window.Kakao.Link.sendCustom({
            templateId: 80454,
            templateArgs: {
                drawingId: drawing.id,
                imageUrl: kakaoUploadUrl,
                title: drawing.title,
                description: drawing.description,
                heartCount: drawing.heartCount,
                scrapCount: drawing.scrapCount
            }
        });
    };

    return (
        <button className="kakao-share-btn" onClick={sendShare}>
            <img src="/img/kakaoIcon.png" width="60px" alt="" />
        </button>
    );
};

export default KakaoDrawingShareButton;