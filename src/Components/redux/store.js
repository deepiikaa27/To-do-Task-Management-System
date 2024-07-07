import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/slice";
import todoslice from "../redux/Slice/todoslice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    todolist: todoslice,
  },
});
