import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//action
export const fetchUserData = async (apiParams) => {
  const authApi = "https://dummyjson.com/auth/login";
  try {
    const response = await axios.post(authApi, JSON.stringify(apiParams), {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.log(err.toString());
    throw err;
  } finally {
    console.log("Auth Api has been called");
  }
};
export const fetchUser = createAsyncThunk("fetchUser", async (apiParams) => {
  return await fetchUserData(apiParams);
});
const user = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  reducers: {
    logout: (state) => {
      state.isLoading = false;
      state.data = null;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.isError = false;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      console.log("error", action.payload);
      state.isError = true;
      state.isLoading = false;
    });
  },
});
export const { logout } = user.actions;

export default user.reducer;
