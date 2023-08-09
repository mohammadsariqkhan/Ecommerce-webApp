import React from 'react';
 
import { createRoot } from "react-dom/client";
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
    element:<Protected><CartPage></CartPage></Protected>,
  },
  {
    path: "/checkout",
    element:<Protected><CheckOut></CheckOut></Protected>,
  },
  {
    path: "/product-detail/:id",
    element:<Protected> <ProductDetailPage></ProductDetailPage></Protected>,
  },
]);

function App() {
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
