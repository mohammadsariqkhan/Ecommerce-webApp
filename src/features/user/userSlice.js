import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchCount, fetchLoggedInUser, fetchLoggedInUserOrder} from './userAPI';

const initialState = {
  userOrder: [],
  status: 'idle',
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrder',
  async (userId) => {
    const response = await fetchLoggedInUserOrder(userId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
 
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
   
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrder  = action.payload;
      });
  },
});

export const { increment } = userSlice.actions;
export const selectCount = (state) => state.user.userInfo;

export default userSlice.reducer;
