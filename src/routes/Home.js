import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import './Home.css';
import Drawing from './Drawing';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

function Home() {

    let code = new URL(window.location.href).searchParams.get("code");
    //const code = useSelector( (state) => state );
    const dispatch = useDispatch();
    const [filter, setFilter] = useState("mostlike");
    
    const pictures = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]; 

    useEffect(() => {
        dispatch({ type: '로그인'})
        document.getElementById("mostlike").style.color = "#3C6B50";

        if(!(code == null)) {
            axios.post('서버api주소', {
                code : code
            });
            
            console.log(`서버로 다음 인가코드 전송함 : ${code}`);
        }
    }, []);

    const changeFilter = (e) => {
        if(e.target.value === "mostlike"){
            document.getElementById(e.target.value).style.color = "#3C6B50";
            document.getElementById("random").style.color = "#8E9398";
        }
        else {
            document.getElementById(e.target.value).style.color = "#3C6B50";
            document.getElementById("mostlike").style.color = "#8E9398";
        }

        setFilter(e.target.value);
    }

    useEffect(() => {
        //filter 변수 값이 변경될 때마다 호출되는 함수, 여기서 이미지 서버에 요청 보내면 됨
        filter === "random" ? console.log("랜덤정렬") : console.log("좋아요순");
    }, [changeFilter]);

    const checkTag = (e) => {
        
        document.getElementById(e.target.className).checked = (document.getElementById(e.target.className).checked) ? false : true;

        if(document.getElementById(e.target.className).checked){
            document.getElementsByClassName(e.target.className)[0].style.backgroundColor = "#3C6B50";
            document.getElementsByClassName(e.target.className)[0].style.color = "#FFFFFF";
        }
        else {  
            document.getElementsByClassName(e.target.className)[0].style.backgroundColor = "#FFFFFF";
            document.getElementsByClassName(e.target.className)[0].style.color = "#3C6B50";
        }

        const tagBox = document.getElementsByName("tagBox");
        tagBox.forEach(tag => { if(tag.checked) console.log(tag.value); });
    }

    return(
        <>
            <Navigation/>

            <div className="homecontainer">
                <div className="tagOptionBox">
                    <div> <img src="/img/textLogo.png" alt=""/> </div>
                    <p className="tagGuide"> 필터를 통해 원하는 이미지를 찾아보세요 </p>

                    <div className="tagBox">
                        <button className="100" onClick={checkTag}> <input id="100" name="tagBox" type="checkbox" value="어두운"/> 어두운 </button>
                        <button className="200" onClick={checkTag}> <input id="200" name="tagBox" type="checkbox" value="화사한"/> 화사한 </button>
                        <button className="300" onClick={checkTag}> <input id="300" name="tagBox" type="checkbox" value="다채로운"/> 다채로운 </button>
                        <button className="400" onClick={checkTag}> <input id="400" name="tagBox" type="checkbox" value="차분한"/> 차분한 </button>
                        <button className="500" onClick={checkTag}> <input id="500" name="tagBox" type="checkbox" value="강렬한"/> 강렬한 </button>
                        <button className="600" onClick={checkTag}> <input id="600" name="tagBox" type="checkbox" value="차가운"/> 차가운 </button>
                        <button className="700" onClick={checkTag}> <input id="700" name="tagBox" type="checkbox" value="따뜻한"/> 따뜻한 </button><br/><br/>
                    </div>

                    <div className="tagBox">
                        <button className="800" onClick={checkTag}> <input id="800" name="tagBox" type="checkbox" value="반고흐"/> 반 고흐 </button>
                        <button className="900" onClick={checkTag}> <input id="900" name="tagBox" type="checkbox" value="클로드모네"/> 클로드 모네 </button>
                        <button className="1000" onClick={checkTag}> <input id="1000" name="tagBox" type="checkbox" value="폴세잔"/> 폴 세잔 </button>
                        <button className="1100" onClick={checkTag}> <input id="1100" name="tagBox" type="checkbox" value="우키요에"/> 우키요에 </button>
                        <button className="1200" onClick={checkTag}> <input id="1200" name="tagBox" type="checkbox" value="풍경"/> 풍경 </button>
                        <button className="1300" onClick={checkTag}> <input id="1300" name="tagBox" type="checkbox" value="동물"/> 동물 </button>
                        <button className="1400" onClick={checkTag}> <input id="1400" name="tagBox" type="checkbox" value="인물"/> 인물 </button>
                        <button className="1500" onClick={checkTag}> <input id="1500" name="tagBox" type="checkbox" value="기타"/> 기타 </button>
                    </div>
                </div>

                <div className="viewOptionBox">
                    <button className="refresh"> 이미지 새로고침 </button>

                    <div className="optionBox">
                        <button className="viewOption" id="mostlike" value="mostlike" onClick={changeFilter}> 좋아요순 </button>
                        <button className="viewOption" disabled> | </button>
                        <button className="viewOption" id="random" value="random" onClick={changeFilter}> 랜덤순 </button>
                    </div>
                </div>

                <div className="drawingBox">
                    {
                        pictures.map((element) => 
                            <div className="drawing">
                                <Drawing key = {element} imgsrc="/img/logo.png" name = {element}/>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Home;