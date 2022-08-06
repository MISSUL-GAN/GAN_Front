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
        
        if(!(code == null)) {
            axios.post('서버api주소', {
                code : code
            });
            
            console.log(`서버로 다음 인가코드 전송함 : ${code}`);
        }
    }, []);

    const changeFilter = (e) => {
        setFilter(e.target.value);
    }

    useEffect(() => {
        //filter 변수 값이 변경될 때마다 호출되는 함수, 여기서 이미지 서버에 요청 보내면 됨
        filter === "random" ? console.log("랜덤정렬") : console.log("좋아요순");
    }, [changeFilter]);

    const checkTag = () => {
        const tagBox = document.getElementsByName("tagBox");
        tagBox.forEach(tag => { if(tag.checked) console.log(tag.value); });
    }

    return(
        <>
            <Navigation/>

            <div className="homecontainer">
                <div className="tagOptionBox">
                    <div> <img src="/img/textLogo.png" width={400}/> </div>
                    <p className="tagGuide"> 필터를 통해 원하는 이미지를 찾아보세요 </p>
                    <form className="tagBox" onClick={checkTag}>
                        <input name="tagBox" type="checkbox" value="어두운"/>어두운&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="화사한"/>화사한&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="다채로운"/>다채로운&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="차분한"/>차분한&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="강렬한"/>강렬한<br/>

                        <input name="tagBox" type="checkbox" value="차가운"/>차가운&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="따뜻한"/>따뜻한&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="풍경"/>풍경&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="동물"/>동물&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="인물"/>인물&nbsp;&nbsp;
                        <input name="tagBox" type="checkbox" value="기타"/>기타<br/>
                    </form>
                </div>

                <div className="viewOptionBox">
                    <button> 이미지 새로고침 </button>
                    <select name="filter" onChange={changeFilter}>
                        <option value="mostlike"> 좋아요순 </option>
                        <option value="random"> 랜덤 보기 </option>
                    </select>
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