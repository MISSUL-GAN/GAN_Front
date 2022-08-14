import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from '../routes/Login'
import Start from '../routes/Start';
import Home from '../routes/Home';
import UserPage from '../routes/UserPage';
import MyPage from "../routes/MyPage";
import Join from '../routes/Join';
import CreateDrawing from '../routes/CreateDrawing';

function GalleryRouter(){
    return( 
        <Router>
            <Routes>
                <Route exact path = "/login/oauth2/code/kakao" element = { <Login/> }/>
                <Route exact path = "/join" element = { <Join/> }/>
                <Route exact path = '/' element = { <Start/> }/>
                <Route exact path = '/home' element = { <Home/> } />
                <Route exact path = '/myPage' element = { <MyPage/> }/>
                <Route exact path = '/create' element = { <CreateDrawing/> }/>
            </Routes>
        </Router>
    );
}

export default GalleryRouter;