import React from "react";

const KakaoImageShareButton = ({ drawing }) => {
    const sendShare = (drawing) => {
        window.Kakao.Share.sendCustom({
            templateId: 81803,
            templateArgs: {
                title: drawing.title,
                description: drawing.description,
                imageUrl: `https://ipfs.io/ipfs/${drawing.fileName}`
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

export default KakaoImageShareButton;