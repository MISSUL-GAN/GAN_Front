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
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));

const user = {id:null, name:null, profileImage:null, accountEmail:null, aToken:null};
//const user = {id:-1, name:"이유진", profileImage:"/img/logo.png", accountEmail:"y@d.n"};

const persistConfig = {
  key : root,
  storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, myReducer);

function myReducer(state = user, action){
    if(action.type === '로그인'){
      return {id:action.user.id, name:action.user.name, accountEmail:action.user.accountEmail, profileImage:action.user.profileImage, aToken:action.user.aToken};
    }
    else if(action.type === '로그아웃')
      window.sessionStorage.clear();
    
    else if(action.type === '별명수정'){
      axios.put("/member/name", {
        headers: {
          Authorization: `Bearer ${state.aToken}`
        },
        params: {
          name: `${action.user.name}`
        }
      });

      return {...state, name:action.user.name};
    }

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
