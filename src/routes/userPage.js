import React, { useEffect }  from "react";
import Navigation from "../components/Navigation";
import { useDispatch } from 'react-redux';

function UserPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: '로그인'})
    }, []);

    return(
        <>
        <Navigation/>
        <div> 여기는 마이 페이지~~~ </div>
        </>
    );
}

export default UserPage;