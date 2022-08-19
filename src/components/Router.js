import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from '../routes/Login'
import Start from '../routes/Start';
import Home from '../routes/Home';
import UserPage from '../routes/UserPage';
import MyPage from "../routes/MyPage";
import Join from '../routes/Join';
import CreateDrawing from '../routes/CreateDrawing';
import ApiTestPage from "../routes/ApiTestPage";
import WithNav from "./WithNav";
import AuthRoute from "./AuthRoute";
import DrawingRoute from "./DrawingRoute";

function GalleryRouter() {
    return (
        <Router>
            <Routes>
                <Route exact path="/login/oauth" element={<Login />} />
                <Route exact path='/' element={<Start />} />
                <Route element={<WithNav />}>
                    <Route element={<AuthRoute />}>
                        <Route exact path='/create' element={<CreateDrawing />} />
                        <Route exact path="/join/:initialName" element={<Join />} />
                        <Route exact path='/myPage' element={<MyPage />} />
                        <Route exact path='/apitest' element={<ApiTestPage />} />
                    </Route>
                    <Route exact path="/home/:drawingId" element={<DrawingRoute />} />
                    <Route exact path='/home' element={<Home />} />
                    <Route exact path='/userPage' element={<UserPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default GalleryRouter;