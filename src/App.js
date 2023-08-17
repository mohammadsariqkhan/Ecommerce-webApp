import React, {useEffect} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
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
import PageNoFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrders from "./features/user/components/UserOrders";
import UserProfilePage from "./pages/UserProfilePage";
import {fetchLoggedInUserAsync} from "./features/user/userSlice";
import LogOut from "./features/auth/components/LogOut";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminProductListPage";
import AdminProductDetailPage from "./pages/AdmiinProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><Home></Home></Protected>,
    },
    {
        path: "/admin",
        element: <ProtectedAdmin><AdminHome></AdminHome></ProtectedAdmin>,
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
        element: <Protected><ProductDetailPage></ProductDetailPage></Protected>,
    },
    {
        path: "/admin/product-detail/:id",
        element: <ProtectedAdmin> <AdminProductDetailPage></AdminProductDetailPage></ProtectedAdmin>,
    },
    {
        path: "/admin/product-form",
        element: <ProtectedAdmin> <AdminProductFormPage></AdminProductFormPage></ProtectedAdmin>,
    },
    {
        path: "/order-success/:id",
        element: <OrderSuccessPage></OrderSuccessPage>
    },
    {
        path: "/orders",
        element: <UserOrders></UserOrders>
    },
    {
        path: "/profile",
        element: <UserProfilePage></UserProfilePage>
    },
    {
        path: "/resetpassword",
        element: <ResetPasswordPage></ResetPasswordPage>
    },
    {
        path: "/logout",
        element: <LogOut></LogOut>
    },
    {
        path: "*",
        element: <PageNoFound></PageNoFound>,
    },
]);

function App() {
    const dispatch = useDispatch()
    const user = useSelector(selectLoggedInUser)
    // const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            dispatch(fetchItemsByUserIdAsync(user.id))
            dispatch(fetchLoggedInUserAsync(user.id))
        }
    }, [dispatch, user])
    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
