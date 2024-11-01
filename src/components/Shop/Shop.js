import React, { useState } from 'react';
import "./Shop.css";
import fakeData from '../../fakeData/products';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart} from '../../utilities/fakedb';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);

    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        const sameProduct = newCart.filter(pd => product.key === pd.key);
        const count = sameProduct.length;
        addToDatabaseCart(product.key, count);
    } 

    return (
        <div className="twin-container">
            <div className="product-container">

            {
                products.map(pd => <Product
                    key={pd.key}
                    showAddToCart={true}
                    handleAddProduct={handleAddProduct} 
                    product={pd}></Product>)
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;