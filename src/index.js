import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const root = ReactDOM.createRoot(document.getElementById('root'));
const user = {nick:null, email:null, image:null, aToken:null, rToken:null};

function myReducer(state = user, action){
    if(action.type === '로그인')
      return {...user, nick:action.user.nick, email:action.user.email, image:action.user.image, aToken:action.user.aToken, rToken:action.user.rToken};
    
    else if(action.type === '로그아웃')
      return {nick:null, email:null, image:null, aToken:null, rToken:null};
    
    
    else if(action.type === '별명수정')
      return {...user, nick:action.user.nick};

    else
      return {...user};
  }

const store = configureStore({ reducer: myReducer});

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
