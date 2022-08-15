import React from "react";
import Navigation from "../components/Navigation";
import { useDispatch } from 'react-redux';

function CreateDrawing() {
    const dispatch = useDispatch();
    
    return(
        <>
        <Navigation/>
        <div> 여기는 그림 바꾸기~~~ </div>
        </>
    );
}

export default CreateDrawing;