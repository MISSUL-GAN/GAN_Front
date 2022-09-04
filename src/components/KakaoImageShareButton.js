import React from "react";

const KakaoImageShareButton = ({ drawing }) => {

    const sendShare = async () => {
        const imageUrl = `https://ipfs.io/ipfs/${drawing.fileName}`;
        const response = await fetch(imageUrl, { method: 'GET' });
        const blob = await response.blob();
        const { url: kakaoUploadUrl } = (await window.Kakao.Share.uploadImage({ file: [blob] }))
            .infos.original;
        window.Kakao.Link.sendCustom({
            templateId: 81803,
            templateArgs: {
                title: drawing.title,
                description: drawing.description,
                imageUrl: kakaoUploadUrl
            }
        });
    };

    return (
        <button className="kakao-share-btn" onClick={sendShare}>
            <img src="/img/kakaoIcon.png" width="60px" alt="" />
        </button>
    );
};

export default KakaoImageShareButton;