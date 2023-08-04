import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/product-list/components/ProductList'


const Home = () => {
  return (
    <div>
        <Navbar children={<ProductList/>}/>
    </div>
  )
}

export default Home