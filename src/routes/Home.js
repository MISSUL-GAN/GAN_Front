import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import './Home.css';
import Drawing from './Drawing';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

function Home() {

    let code = new URL(window.location.href).searchParams.get("code");
    //const code = useSelector( (state) => state );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: '로그인'})
        
        if(!(code == null)) {
            axios.post('서버api주소', {
                code : code
            });
            
            console.log(`서버로 다음 인가코드 전송함 : ${code}`);
        }
    }, []);

    const pictures = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; 

    return(
        <>
            <Navigation/>
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