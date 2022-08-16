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
import { rootReducer } from './redux/reducer';

const root = ReactDOM.createRoot(document.getElementById('root'));

const persistConfig = {
  key : root,
  storage: storageSession,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({reducer : persistedReducer}, applyMiddleware());
const Persistor = persistStore(store);

root.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <App />
      </PersistGate>
    </Provider>
);
