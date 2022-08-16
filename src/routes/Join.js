import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import { useSelector, useDispatch } from 'react-redux';
import './Join.css';
import { useParams } from "react-router-dom";

function Join() {
    const member = useSelector(state => state.member);
    const dispatch = useDispatch();
    const { initialName } = useParams();

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
        console.log(member.name + " / " + member.accountEmail + " / " + member.profileImage)
    }, [member]);

    const submitNick = () => {
        let newNick = document.getElementById("input").value;
        
        if(newNick.length === 0)
            newNick = `${member.name}`;
        
        dispatch({ 
            type:'별명수정',
            user : {id:member.id, name:newNick, accountEmail:member.accountEmail, profileImage:member.profileImage}
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
                <input id="input" onChange={onChange} type="text" minLength={2} maxLength={12} placeholder={initialName} autoComplete="off"/>
                <button id="submitButton" onClick={submitNick}> 별명 설정 완료 </button>
            </div>

            <p id="warning"> * 한글, 영문으로 구성된 2자 이상 12자 이하의 별명을 적어주세요. (해당 별명은 이후 변경할 수 없습니다) </p>
        </div>
        </>
    );
}

export default Join;