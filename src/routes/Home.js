import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import './Home.css';
import Drawing from './Drawing';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

function Home() {

    const user = useSelector( (state) => state );
    const dispatch = useDispatch();
    const pictures = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; 

    useEffect(() => {
        dispatch({ type: '확인'})
    }, []);

    return(
        <>
        <Navigation/>
        <br/><br/>
        { console.log("home 에서 확인한 현재 유저 : " + user.nick)}
        {
            pictures.map((element) => 
                <>
                    <Drawing key = {element} imgsrc="/img/logo.png" name = {element}/>
                    <br/><br/>
                </>
            )
        }
        </>
    );
}

export default Home;