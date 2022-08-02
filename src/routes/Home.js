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
    const [filter, setFilter] = useState("random");
    
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
        filter == "random" ? console.log("랜덤정렬") : console.log("좋아요순");
    }, [changeFilter]);

    return(
        <>
            <Navigation/>

            <select name="filter" onChange={changeFilter}>
                <option value="random"> 랜덤 보기 </option>
                <option value="mostlike"> 좋아요 높은순 </option>
            </select>

            <div className="homecontainer">
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