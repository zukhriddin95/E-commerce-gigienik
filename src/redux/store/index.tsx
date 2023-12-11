"use client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer, { authSlice } from "../slice/authSlice";
import childrenType from "@/types/childType";

const rootReducer = {
  [authSlice.name]: authReducer,
};

export const store = configureStore({ reducer: rootReducer });

const StoreProvider = ({ children }: childrenType) => {
  return <Provider store={store}>{children}</Provider>;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default StoreProvider;
