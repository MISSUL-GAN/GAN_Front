import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import './Join.css';
import { useParams } from "react-router-dom";

function Join() {
    const member = useSelector(state => state.member);
    const dispatch = useDispatch();
    const { initialName } = useParams();

    const [suitableName, setSuitableName] = useState(true);
    var spc = /[.,~!@#$%^&*()_+|<>?:{}]/;
    var blank = /[\s]/g;
    var number = /\d/;

    const inputBoxRef = useRef();
    const inputRef = useRef();
    const checkNameImg = useRef();
    const warningRef = useRef();
    const submitRef = useRef();
        
    const onChange = (e) => {
        var input = e.target.value;

        if(input.length === 0) {
            inputBoxRef.current.style.outline = "none";

            warningRef.current.innerHTML = "* 한글, 영문으로 구성된 2자 이상 12자 이하의 별명을 적어주세요. (해당 별명은 이후 변경할 수 없습니다)";
            warningRef.current.style.color = "#9F9F9F";

            submitRef.current.style.disabled = false;
            submitRef.current.style.opacity = "1";
            submitRef.current.style.cursor = "pointer";

            setSuitableName(true);
        }
        else if(input.search(spc) > -1 || input.search(blank) > -1 || input.search(number) > -1 || input.length > 12 || input.length < 2){
            inputBoxRef.current.style.outline = "1.5px solid #FF0000";

            warningRef.current.innerHTML = "* 한글, 영문으로만 구성된 2자 이상 12자 이하의 별명을 적어주세요.";
            warningRef.current.style.color = "#FF0000";

            submitRef.current.style.disabled = true;
            submitRef.current.style.opacity = "0.5";
            submitRef.current.style.cursor = "not-allowed";

            setSuitableName(false);
        }
        else {
            inputBoxRef.current.style.outline = "1.5px solid #3C6B50";

            warningRef.current.innerHTML = "* 해당 별명은 이후 변경할 수 없습니다.";
            warningRef.current.style.color = "#9F9F9F";

            submitRef.current.style.disabled = false;
            submitRef.current.style.opacity = "1";
            submitRef.current.style.cursor = "pointer";

            setSuitableName(true);
        }
    }

    const submitNick = () => {
        let newNick = inputRef.current.value;
        
        if(newNick.length === 0)
            newNick = `${member.name}`;
        
        dispatch({ 
            type:'별명수정',
            user : {id:member.id, name:newNick, accountEmail:member.accountEmail, profileImage:member.profileImage}
        });

        window.location.href = "/home";
    }

    useEffect(() => {
        checkNameImg.current.style.visibility = "hidden";
        
        inputRef.current.addEventListener('focus', () => {
            checkNameImg.current.style.visibility = "hidden";
        });

        inputRef.current.addEventListener('blur', () => {
            checkNameImg.current.style.visibility = "visible";
        });
    }, [])

    return (
        <>
            <div className="page-content">
                <img className="logo" src="/img/textLogo2.png" width={200} alt="" />

                <div className="nicknameGuide">‘Missul;GAN’에서 사용할 별명을 적어주세요.</div>

                <div>
                    <div id="nicknameBox">
                        <div ref={inputBoxRef}>
                            <input id="name-input" ref={inputRef} onChange={onChange} type="search" minLength={2} maxLength={12} placeholder={initialName} autoComplete="off" />
                            <div ref={checkNameImg}> <img src={suitableName ? "/img/suitableName.png" : "/img/notSuitableName.png"} /> </div>
                        </div>

                        <button id="submitButton" onClick={submitNick} ref={submitRef}> 별명 설정 완료 </button>
                    </div>

                    <p id="warning" ref={warningRef}> * 한글, 영문으로 구성된 2자 이상 12자 이하의 별명을 적어주세요. (해당 별명은 이후 변경할 수 없습니다) </p>
                </div>
            </div>
        </>
    );
}

export default Join;