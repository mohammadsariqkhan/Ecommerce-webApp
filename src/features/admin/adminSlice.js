import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchAllProducts, fetchBrands, fetchCategories, fetchProductById, fetchProductsByFilter} from './adminAPI';

const initialState = {
    products: [],
    brands: [],
    categories: [],
    status: 'idle',
    totalItems: 0,
    selectedProduct: null
};

export const fetchAllProductAsync = createAsyncThunk(
    'product/fetchAllProducts',
    async () => {
        const response = await fetchAllProducts();
        return response.data;
    }
);
export const fetchBrandsAsync = createAsyncThunk(
    'product/fetchBrands',
    async () => {
        const response = await fetchBrands();
        return response.data;
    }
);
export const fetchCategoriesAsync = createAsyncThunk(
    'product/fetchCategories',
    async () => {
        const response = await fetchCategories();
        return response.data;
    }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
    'product/fetchProductsByFilters',
    async ({filter, sort, pagination}) => {
        const response = await fetchProductsByFilter(filter, sort, pagination);
        return response.data;
    }
);
export const fetchAllProductByIdAsync = createAsyncThunk(
    'product/fetchProductById',
    async (id) => {
        const response = await fetchProductById(id);
        return response.data;
    }
);


export const adminSlice = createSlice({
    name: 'product',
    initialState,

    reducers: {
        increment: (state) => {
            state.value += 1;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })
            .addCase(fetchProductsByFiltersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload.products;
                state.totalItems = action.payload.totalItems;
            })
            .addCase(fetchBrandsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.brands = action.payload;
            })
            .addCase(fetchCategoriesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.categories = action.payload;
            })
            .addCase(fetchAllProductByIdAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.selectedProduct = action.payload;
            })
    },
});

export const {increment} = adminSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectAllItems = (state) => state.product.totalItems;
export const selectCategories = (state) => state.product.categories;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectBrands = (state) => state.product.brands;
export default adminSlice.reducer;