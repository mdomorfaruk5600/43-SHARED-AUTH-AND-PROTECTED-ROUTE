import React, { useEffect, useState } from 'react';
import {getDatabaseCart, processOrder, removeFromDatabaseCart} from '../../utilities/fakedb';
import products from '../../fakeData/products'
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useNavigate } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    
    const navigate = useNavigate();

    const handleProceedCheckout = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
        navigate('/shipment');
    }

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

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);        
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    let thankyou;
    
    if(orderPlaced){
        thankyou = <img src={happyImage} alt='' />;
    }

    return (
        <div className='twin-container'>
            <div className='product-container'>
                {
                    cart.map(pd => <ReviewItem key={pd.key} removeProduct={removeProduct} product={pd}></ReviewItem>)
                }
                { thankyou }
            </div>
            <div className='cart-container'>
                <Cart cart = {cart}>
                    <button onClick={handleProceedCheckout} className='main-button'>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;