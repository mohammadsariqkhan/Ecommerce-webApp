import React, {useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteItemFromCartAsync, selectItems, updateItemAsync} from "../features/cart/cartSlice";
import {useForm} from "react-hook-form";
import {selectLoggedInUser, updateUserAsync} from "../features/auth/authSlice";
import {createOrderAsync, selectCurrentOrder} from "../features/order/orderSlice";

const CheckOut = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(true);
    const items = useSelector(selectItems)
    const totalAmount = items.reduce((amount, item) => item.price * item.quantity + amount, 0)
    const totalItems = items.reduce((total, item) => item.quantity + total, 0)
    const {handleSubmit, register, formState: {errors}, reset} = useForm();
    const user = useSelector(selectLoggedInUser)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState("cash")
    const currentOrder = useSelector(selectCurrentOrder)

    const handleQuantity = (e, item) => {
        ///////////////////////////////////////////////////////////////
        dispatch(updateItemAsync({...item, quantity: +e.target.value}))
    }
    const handleRemove = (e, id) => {
        dispatch(deleteItemFromCartAsync(id))
    }
    const handleAddress = (e) => {
        setSelectedAddress(user.addresses[e.target.value])
    }
    const handlePayment = (e) => {

        setPaymentMethod(e.target.value)


    }
    const handleOrder = (e) => {
        if (selectedAddress && paymentMethod) {
            const order = {
                items,
                totalAmount,
                user: user.id,
                paymentMethod,
                selectedAddress,
                status: 'pending'
            }
            dispatch(createOrderAsync(order))
        } else {
            alert("enter address and payment method");
        }


    }
    return (// <div className="mx-auto rounded-xl p-10 mt-24 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <>
            {!items.length && <Navigate to='/' replace={true}></Navigate>}
            {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <form noValidate className="bg-white px-10 py-8" onSubmit={handleSubmit((data) => {
                            dispatch(updateUserAsync({...user, addresses: [...user.addresses, data]}))
                            reset()
                        })}>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base text-2xl font-semibold leading-7 text-gray-900">
                                        Personal Information
                                    </h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Use a permanent address where you can receive mail.
                                    </p>

                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Full Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    {...register('name', {required: "name is required"})}
                                                    id="first-name"
                                                    autoComplete="given-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    {...register('email', {required: "email is required"})}
                                                    type="email"
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label
                                                htmlFor="country"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Phone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="tel"
                                                    {...register('phone', {required: "phone is required"})}
                                                    id="street-address"
                                                    autoComplete="street-address"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>

                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label
                                            htmlFor="street-address"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Street address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register('street', {required: "street is required"})}
                                                id="street-address"
                                                autoComplete="street-address"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                        <label
                                            htmlFor="city"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            City
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register('city', {required: "city is required"})}
                                                id="city"
                                                autoComplete="address-level2"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="region"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            State / Province
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register('region', {required: "region is required"})}
                                                id="region"
                                                autoComplete="address-level1"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label
                                            htmlFor="postal-code"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            ZIP / Postal code
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                {...register('pincode', {required: "pincode is required"})}
                                                id="postal-code"
                                                autoComplete="postal-code"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                                <button
                                    type="button"
                                    className="text-sm font-semibold leading-6 text-gray-900"
                                >
                                    Reset
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Add Address
                                </button>
                            </div>

                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">
                                    Address
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Choose from Existing Address
                                </p>
                                <ul role="list">
                                    {user.addresses.map((address, index) => (<li
                                        key={index}
                                        className="flex justify-between gap-x-6 py-5"
                                    >
                                        <div className="flex gap-x-4">
                                            <input
                                                name="address"
                                                type="radio"
                                                onClick={handleAddress}
                                                value={index}
                                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />

                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                                    {address.name}
                                                </p>
                                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                                    {address.street}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                                            <p className="text-sm leading-6 text-gray-500">
                                                Phone:{address.phone}
                                            </p>
                                            <p className="text-sm leading-6 text-gray-500">
                                                {address.pinCode}
                                            </p>
                                        </div>
                                    </li>))}
                                </ul>

                                <div className="mt-10 space-y-10">
                                    <fieldset>
                                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                                            Payment Methods
                                        </legend>
                                        <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Choose One
                                        </p>
                                        <div className="mt-6 space-y-6">
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="cash"
                                                    name="payments"

                                                    value="cash"
                                                    type="radio"
                                                    checked={paymentMethod === 'cash'}
                                                    onChange={handlePayment}
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label
                                                    htmlFor="cash"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Cash
                                                </label>
                                            </div>
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    id="card"
                                                    name="payments"
                                                    value="card"
                                                    checked={paymentMethod === 'card'}
                                                    onChange={handlePayment}

                                                    type="radio"
                                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                                <label
                                                    htmlFor="card"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Card Payment
                                                </label>
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="lg:col-span-2">
                        <div className="mx-auto mt-24 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h2 className="text-2xl">Cart</h2>
                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {items.map((item) => (<li key={item.id} className="flex py-6">
                                            <div
                                                className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={item.thumbnail}
                                                    alt={item.title}
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div
                                                        className="flex justify-between text-base font-medium text-gray-900">
                                                        <h3>
                                                            <a href={item.id}>{item.title}</a>
                                                        </h3>
                                                        <p className="ml-4">${item.price}</p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-500">
                                                        {item.brand}
                                                    </p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="text-gray-500">
                                                        <label
                                                            htmlFor="quantity"
                                                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                                        >
                                                            Qty
                                                        </label>

                                                        <select value={item.quantity}
                                                                onChange={(e) => handleQuantity(e, item)}>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="2">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </div>

                                                    <div className="flex">
                                                        <button
                                                            onClick={(e) => handleRemove(e, item.id)}
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>))}
                                    </ul>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>${totalAmount}</p>
                                </div>
                                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                                    <p>Total Items in Cart</p>
                                    <p>{totalItems} Items</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">
                                    Shipping and taxes calculated at checkout.
                                </p>
                                <div className="mt-6">
                                    <div
                                        onClick={handleOrder}
                                        className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Order Now
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or<span>  </span>
                                        <Link to="/">
                                            <button
                                                type="button"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                onClick={() => setOpen(false)}
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>)

};

export default CheckOut;
