import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { authCode } from './LoginCode.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
const code = null;

function myReducer(state = code, action){
    if(action.type === '클릭'){
      state = authCode;
      return state;
    }
    else 
      return state;
  }

const store = configureStore({ reducer: myReducer});

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
