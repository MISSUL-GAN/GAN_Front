import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'; 
import storageSession from 'redux-persist/lib/storage/session';
import { applyMiddleware } from 'redux'; 
import { PersistGate } from 'redux-persist/integration/react'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

const user = {nick:null, email:null, image:null, aToken:null, rToken:null};

const persistConfig = {
  key : root,
  storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, myReducer);

function myReducer(state = user, action){
    if(action.type === '로그인')
      return {nick:action.user.nick, email:action.user.email, image:action.user.image, aToken:action.user.aToken, rToken:action.user.rToken};
    
    else if(action.type === '로그아웃')
      return {nick:null, email:null, image:null, aToken:null, rToken:null};
    
    
    else if(action.type === '별명수정')
      return {...user, nick:action.user.nick};

    else
      return state;
  }

const store = configureStore({reducer : persistedReducer}, applyMiddleware());
const Persistor = persistStore(store);

root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <App />
      </PersistGate>
    </Provider>
);
