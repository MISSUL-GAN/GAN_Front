import React from "react";
import Navigation from "../components/Navigation";
import './Join.css';

function Join() {

    var spc = /[~!@#$%^&*()_+|<>?:{}]/;
    var blank = /[\s]/g;
    var number = /\d/;

    const onChange = (e) => {
        var input = e.target.value;

        if(input.search(spc) > -1 || input.search(blank) > -1 || input.search(number) > -1 || input.length > 12 || input.length < 2){
            document.getElementById("input").style.outline = "1.5px solid #FF0000";
            document.getElementById("warning").innerHTML = "* 한글, 영문으로만 구성된 2자 이상 12자 이하의 별명을 적어주세요.";
            document.getElementById("warning").style.color = "#FF0000";
        }
        else {
            document.getElementById("input").style.outline = "1.5px solid #3C6B50";
            document.getElementById("warning").innerHTML = "* 해당 별명은 이후 변경할 수 없습니다.";
            document.getElementById("warning").style.color = "#9F9F9F";
        }

    }

    return(
        <>
        <Navigation />

        <div className="page-content">
            <img className="logo" src="/img/textLogo2.png" width={200} alt=""/>
            <div className="nicknameGuide">‘Missul;GAN’에서 사용할 별명을 적어주세요.</div>
            <form className="nicknameBox">
                <input id="input" onChange={onChange} type="text" minLength={2} maxLength={12} placeholder="한글, 영문으로 구성된 2자 이상 12자 이하의 별명을 적어주세요."/>
                <input id="submitButton" type="submit" value="별명 설정 완료"/>
            </form>
            <p id="warning"> * 해당 별명은 이후 변경할 수 없습니다. </p>
        </div>
        </>
    );
}

export default Join;