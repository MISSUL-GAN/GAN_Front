import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import { useSelector, useDispatch } from 'react-redux';
import './Join.css';

function Join() {
    const user = useSelector( (state) => state );
    const dispatch = useDispatch();

    var spc = /[.,~!@#$%^&*()_+|<>?:{}]/;
    var blank = /[\s]/g;
    var number = /\d/;

    const onChange = (e) => {
        var input = e.target.value;

        if(input.length === 0) {
            document.getElementById("input").style.outline = "none";
            document.getElementById("warning").innerHTML = "* 한글, 영문으로 구성된 2자 이상 12자 이하의 별명을 적어주세요. (해당 별명은 이후 변경할 수 없습니다)";
            document.getElementById("warning").style.color = "#9F9F9F";

            document.getElementById("submitButton").disabled = false;
            //버튼 색 바꾸기
            //커서 모양 바꾸기
        }
        else if(input.search(spc) > -1 || input.search(blank) > -1 || input.search(number) > -1 || input.length > 12 || input.length < 2){
            document.getElementById("input").style.outline = "1.5px solid #FF0000";
            document.getElementById("warning").innerHTML = "* 한글, 영문으로만 구성된 2자 이상 12자 이하의 별명을 적어주세요.";
            document.getElementById("warning").style.color = "#FF0000";

            document.getElementById("submitButton").disabled = true;
            //버튼 색 바꾸기
            //커서 모양 바꾸기
        }
        else {
            document.getElementById("input").style.outline = "1.5px solid #3C6B50";
            document.getElementById("warning").innerHTML = "* 해당 별명은 이후 변경할 수 없습니다.";
            document.getElementById("warning").style.color = "#9F9F9F";

            document.getElementById("submitButton").disabled = false;
            //버튼 색 바꾸기
            //커서 모양 바꾸기
        }
    }

    useEffect(() => {
        console.log(user.name + " / " + user.accountEmail + " / " + user.profileImage)
    }, []);

    const submitNick = () => {
        let newNick = document.getElementById("input").value;
        
        if(newNick.length === 0)
            newNick = `${user.name}`;
        
        dispatch({ 
            type:'별명수정',
            user : {id:user.id, name:newNick, accountEmail:user.accountEmail, profileImage:user.profileImage, aToken:user.aToken}
        });

        window.location.href = "/home";
    }

    return(
        <>
        <Navigation />

        <div className="page-content">
            <img className="logo" src="/img/textLogo2.png" width={200} alt=""/>

            <div className="nicknameGuide">‘Missul;GAN’에서 사용할 별명을 적어주세요.</div>

            <div id="nicknameBox">
                <input id="input" onChange={onChange} type="text" minLength={2} maxLength={12} placeholder={user.name} autoComplete="off"/>
                <button id="submitButton" onClick={submitNick}> 별명 설정 완료 </button>
            </div>

            <p id="warning"> * 한글, 영문으로 구성된 2자 이상 12자 이하의 별명을 적어주세요. (해당 별명은 이후 변경할 수 없습니다) </p>
        </div>
        </>
    );
}

export default Join;