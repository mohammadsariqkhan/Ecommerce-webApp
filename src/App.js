import React, {useEffect} from 'react';

import {createRoot} from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
} from "react-router-dom";
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CheckOut from './pages/CheckOut';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from "./features/auth/components/Protected";
import {useDispatch, useSelector} from "react-redux";
import {fetchItemsByUserIdAsync} from "./features/cart/cartSlice";
import {selectLoggedInUser} from "./features/auth/authSlice";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home></Home></Protected>,
    },
    {
        path: "/login",
        element: <LoginPage></LoginPage>,
    },
    {
        path: "/signup",
        element: <SignupPage></SignupPage>,
    },
    {
        path: "/cart",
        element: <Protected><CartPage></CartPage></Protected>,
    },
    {
        path: "/checkout",
        element: <Protected><CheckOut></CheckOut></Protected>,
    },
    {
        path: "/product-detail/:id",
        element: <Protected> <ProductDetailPage></ProductDetailPage></Protected>,
    },
]);

function App() {
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)
    useEffect(() => {
        if(user){
            dispatch(fetchItemsByUserIdAsync(user.id))
        }

    }, [dispatch,user.id]);
    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
