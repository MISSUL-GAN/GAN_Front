import React from "react";
import Navigation from "../components/Navigation";
import './Join.css';

function Join() {
    return(
        <>
        <Navigation />

        <div>
            <div> 미슐간 초록색 텍스트 로고 들어갈 자리 </div>
            <div>‘Missul;GAN’에서 사용할 별명을 적어주세요.</div>
            <div>
                <input type="text" placeholder="한글, 영문으로 구성된 2자 이상 12자 이하의 별명을 적어주세요."/>
                <button> 별명 설정 완료 </button>
                <p> * 해당 별명은 이후 변경할 수 없습니다. </p>
            </div>
        </div>
        </>
    );
}

export default Join;