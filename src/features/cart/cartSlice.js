import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {addToCart, fetchCount, fetchItemsByUserId} from './cartAPI';

const initialState = {
    items: [],
    status: 'idle',
};

export const addToCartAsync = createAsyncThunk(
    'cart/addToCart',
    async (item) => {
        const response = await addToCart(item);
        return response.data;
    }
);
export const fetchItemsByUserIdAsync = createAsyncThunk(
    'cart/fetchItemsByUserId',
    async (userId) => {
        const response = await fetchItemsByUserId(userId);
        return response.data;
    }
);

export const counterSlice = createSlice({
    name: 'cart',
    initialState,

    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items.push(action.payload);
            })
            .addCase(fetchItemsByUserIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload
            });
    },
});

export const {increment} = counterSlice.actions;
export const selectItems = (state) => state.cart.items;

export default counterSlice.reducer;
