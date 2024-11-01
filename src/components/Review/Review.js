import React, { useEffect, useState } from 'react';
import {getDatabaseCart} from '../../utilities/fakedb';
import products from '../../fakeData/products'

const Review = () => {
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = products.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);
    console.log(cart);

    return (
        <div>
            <h1>Cart Items : {cart.length}</h1>
        </div>
    );
};

export default Review;