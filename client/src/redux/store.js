// import { createStore, applyMiddleware, compose } from "redux";
import { configureStore,applyMiddleware, compose } from '@reduxjs/toolkit'
import reducer from "./reducer";
import thunk from "redux-thunk";

const store =configureStore({reducer:reducer});

export default store;