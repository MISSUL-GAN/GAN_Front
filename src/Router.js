import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login';
import Start from './Start';
import Home from './Home';

function GalleryRouter(){
    return( 
        <Router>
            <Routes>
                <Route exact path = '/' element = { <Start/> }/>
                <Route exact path = '/login' element = { <Login/> }/>
                <Route exact path = '/home' element = { <Home/> } />
            </Routes>
        </Router>

    );
}

export default GalleryRouter;