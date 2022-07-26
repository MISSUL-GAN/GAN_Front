import React from "react";
import Navigation from "../components/Navigation";
import './Home.css';
import Drawing from './Drawing';

function Home() {

    const pictures = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; 

    return(
        <>
        <Navigation/>
        <br/><br/>

        {
            pictures.map((element) => 
                <Drawing key = {element} imgsrc="/img/logo.png" name = {element}/>
            )
        }
        </>
    );
}

export default Home;