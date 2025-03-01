import React, { useEffect, useState } from 'react';
import "./Shop.css";
import fakeData from '../../fakeData/products';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/fakedb';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);

    const [cart, setCart] = useState([]);

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        });
        setCart(previousCart);
    }, []);

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        console.log(product);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }else{
            product.quantity = count;
            newCart = [...cart, product];
        }
        console.log(newCart);
        setCart(newCart);
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
                <Cart cart={cart}>
                    <Link to={'/review'} className='main-button'>Review Order</Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;