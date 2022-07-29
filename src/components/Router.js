import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from '../routes/Login'
import Start from '../routes/Start';
import Home from '../routes/Home';
import UserPage from '../routes/UserPage';
import CreateDrawing from '../routes/CreateDrawing';

function GalleryRouter(){
    return( 
        <Router>
            <Routes>
                <Route exact path = '/' element = { <Start/> }/>
                <Route exact path = '/login' element = { <Login/> }/>
                <Route exact path = '/home' element = { <Home/> } />
                <Route exact path = '/myPage' element = { <UserPage/> }/>
                <Route exact path = '/create' element = { <CreateDrawing/> }/>
            </Routes>
        </Router>

    );
}

export default GalleryRouter;