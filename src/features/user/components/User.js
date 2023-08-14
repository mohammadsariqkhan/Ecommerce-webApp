import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    fetchLoggedInUserOrderAsync,
    increment,
    incrementAsync,

    selectCount, selectUserOrder,
} from '../userSlice';
import {selectLoggedInUser} from "../../auth/authSlice";


export default function User() {


    return (
        <div>
            <div>

            </div>
        </div>
    );
}
