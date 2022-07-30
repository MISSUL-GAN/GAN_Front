import React, { useEffect }  from "react";
import Navigation from "../components/Navigation";
import { useDispatch } from 'react-redux';

function CreateDrawing() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: '로그인'})
    }, []);
    
    return(
        <>
        <Navigation/>
        <div> 여기는 그림 바꾸기~~~ </div>
        </>
    );
}

export default CreateDrawing;