import React from "react";
import Navigation from "../components/Navigation";
import './Join.css';

function Join() {
    return(
        <>
        <Navigation />

        <div className="page-content">
            <img className="logo" src="/img/textLogo2.png" width={200} alt=""/>
            <div className="nicknameGuide">‘Missul;GAN’에서 사용할 별명을 적어주세요.</div>
            <div className="nicknameBox">
                <input type="text" placeholder="   한글, 영문으로 구성된 2자 이상 12자 이하의 별명을 적어주세요."/>
                <button> 별명 설정 완료 </button>
            </div>
            <p className="warning"> * 해당 별명은 이후 변경할 수 없습니다. </p>
        </div>
        </>
    );
}

export default Join;