import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from '../routes/Login'
import Start from '../routes/Start';
import Home from '../routes/Home';
import UserPage from '../routes/UserPage';
import CreateDrawing from '../routes/CreateDrawing';

function GalleryRouter(){
    const c = '/login/oauth2/code/kakao?accessToken=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2aXB5b3VqaW5AZGF1bS5uZXQiLCJyb2xlIjoiUk9MRV9VU0VSIiwiaWF0IjoxNjU5NDUyODI2LCJleHAiOjE2NTk1MzkyMjZ9.Gif-aO9Ipenz2txcBJCIGtjMJx7lZteZZ4s3XJj9_xL2JJ6AWDnJARYsfjOlR4AfBALyKkiLHeNa6pYcFtqLkw&refreshToken=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2aXB5b3VqaW5AZGF1bS5uZXQiLCJpYXQiOjE2NTk0NTI4MjYsImV4cCI6MTY2MDA1NzYyNn0.9h_6pvcTdexwCEo26HgWsc_yMel4d7u8grD0EGE7jgC3KmnTY5FJTeHAJ9Z2Ao-6dYLxLa5ZTCV56KvHLTwWRw';

    return( 
        <Router>
            <Routes>
                <Route exact path = "/login/oauth2/code/kakao" element = { <Login/> }/>
                <Route exact path = '/' element = { <Start/> }/>
                <Route exact path = '/home' element = { <Home/> } />
                <Route exact path = '/myPage' element = { <UserPage/> }/>
                <Route exact path = '/create' element = { <CreateDrawing/> }/>
            </Routes>
        </Router>

    );
}

export default GalleryRouter;