import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createProductAsync, selectBrands, selectCategories} from "../../product-list/productSlice";
import {useForm} from "react-hook-form";

function ProdcutForm(props) {
    const dispatch = useDispatch()
    const brands = useSelector(selectBrands)
    const categories = useSelector(selectCategories)
    const {handleSubmit, register, formState: {errors}, reset} = useForm();
    return (
        <form noValidate onSubmit={handleSubmit((data) => {
            console.log(data)
            const product = {...data}
            product.images = [product.image1, product.image2, product.image3, product.thumbnail]
            product.rating = 0;
            delete product.image1
            delete product.image2
            delete product.image3
            console.log(product)
            dispatch(
                createProductAsync(product)
            )

        })}>
            <div className="space-y-12 bg-white p-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="username"
                                   className="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                    <input type="text" {...register('title', {
                                        required: 'name is required',
                                    })} id="title" autoComplete="username"
                                           className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="Description"
                                   className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                            <div className="mt-2">
                                <textarea id="description" {...register('description', {
                                    required: 'Description is required',
                                })} rows="3"
                                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about
                                Product.</p>
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="brand"
                                   className="block text-sm font-medium leading-6 text-gray-900">Brand</label>
                            <div className="mt-2">
                                <select  {...register('brand', {
                                    required: 'brand is required',
                                })}>
                                    <option value="">--choose brand--</option>
                                    {brands.map(brand =>
                                        (<option value={brand.value}>{brand.label}</option>))
                                    }
                                </select>
                            </div>

                        </div>
                        <div className="col-span-full">
                            <label htmlFor="category"
                                   className="block text-sm font-medium leading-6 text-gray-900">Categories</label>
                            <div className="mt-2">
                                <select {...register('category', {
                                    required: 'category is required',
                                })}>
                                    <option value="">--choose brand--</option>
                                    {categories.map(category =>
                                        (<option value={category.value}>{category.label}</option>))
                                    }
                                </select>
                            </div>

                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="price"
                                   className="block text-sm font-medium leading-6 text-gray-900">Price</label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                    <input type="number" {...register('price', {
                                        required: 'price is required',
                                        min: 1,
                                        max: 10000
                                    })} id="price"
                                           className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="discountPercentage"
                                   className="block text-sm font-medium leading-6 text-gray-900">Discount</label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                    <input type="number" {...register('discountPercentage', {
                                        required: 'discountPercentage is required',
                                        min: 0,
                                        max: 100,
                                    })} id="discountPercentage"
                                           className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="stock"
                                   className="block text-sm font-medium leading-6 text-gray-900">Stock</label>
                            <div className="mt-2">
                                <div
                                    className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                    <input type="number" {...register('stock', {
                                        required: 'stock is required',
                                        min: 0,
                                    })} id="stock"
                                           className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="thumbnail"
                               className="block text-sm font-medium leading-6 text-gray-900">Thumbnail</label>
                        <div className="mt-2">
                            <div
                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                <input type="text" {...register('thumbnail', {
                                    required: 'Thumbnail is required',
                                })} id="thumbnail"
                                       className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="image1"
                               className="block text-sm font-medium leading-6 text-gray-900">Image 1</label>
                        <div className="mt-2">
                            <div
                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                <input type="text"  {...register('image1', {
                                    required: 'image1 is required',
                                })} id="image1"
                                       className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="image2"
                               className="block text-sm font-medium leading-6 text-gray-900">Image 2</label>
                        <div className="mt-2">
                            <div
                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                <input type="text" {...register('image2', {
                                    required: 'image2 is required',
                                })} id="image2"
                                       className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-6">
                        <label htmlFor="image3"
                               className="block text-sm font-medium leading-6 text-gray-900">Image 3</label>
                        <div className="mt-2">
                            <div
                                className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">

                                <input type="text" {...register('image3', {
                                    required: 'image3 is required',
                                })} id="image3"
                                       className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>


                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Extra</h2>


                </div>

                <div className="border-b border-gray-900/10 pb-12">

                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input id="comments" name="comments" type="checkbox"
                                               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900">Comments</label>
                                        <p className="text-gray-500">Get notified when someones posts a comment on a
                                            posting.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input id="candidates" name="candidates" type="checkbox"
                                               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="candidates"
                                               className="font-medium text-gray-900">Candidates</label>
                                        <p className="text-gray-500">Get notified when a candidate applies for a
                                            job.</p>
                                    </div>
                                </div>
                                <div class="relative flex gap-x-3">
                                    <div class="flex h-6 items-center">
                                        <input id="offers" name="offers" type="checkbox"
                                               class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                    </div>
                                    <div class="text-sm leading-6">
                                        <label for="offers" class="font-medium text-gray-900">Offers</label>
                                        <p class="text-gray-500">Get notified when a candidate accepts or rejects an
                                            offer.</p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend class="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                            <p class="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile
                                phone.</p>
                            <div class="mt-6 space-y-6">
                                <div class="flex items-center gap-x-3">
                                    <input id="push-everything" name="push-notifications" type="radio"
                                           class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                    <label for="push-everything"
                                           class="block text-sm font-medium leading-6 text-gray-900">Everything</label>
                                </div>
                                <div class="flex items-center gap-x-3">
                                    <input id="push-email" name="push-notifications" type="radio"
                                           class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                    <label for="push-email" class="block text-sm font-medium leading-6 text-gray-900">Same
                                        as email</label>
                                </div>
                                <div class="flex items-center gap-x-3">
                                    <input id="push-nothing" name="push-notifications" type="radio"
                                           class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                                    <label for="push-nothing" class="block text-sm font-medium leading-6 text-gray-900">No
                                        push notifications</label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button type="submit"
                        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save
                </button>
            </div>
        </form>
    );
}

export default ProdcutForm;