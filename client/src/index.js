import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux';
import connectionReducer from "./features/connection";
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
    key: 'root',
    storage,
}

const reducers = combineReducers({
    connection: connectionReducer
})

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    
    <React.StrictMode>
        <Provider store ={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
    
)