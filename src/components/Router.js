import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from '../routes/Login'
import Start from '../routes/Start';
import Home from '../routes/Home';
import userPage from '../routes/userPage';

function GalleryRouter(){
    return( 
        <Router>
            <Routes>
                <Route exact path = '/' element = { <Start/> }/>
                <Route exact path = '/login' element = { <Login/> }/>
                <Route exact path = '/home' element = { <Home/> } />
                <Route exact path = '/myPage' element = { <userPage/> }/>
            </Routes>
        </Router>

    );
}

export default GalleryRouter;