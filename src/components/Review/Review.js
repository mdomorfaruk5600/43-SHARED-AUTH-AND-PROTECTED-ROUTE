import React, { useEffect, useState } from 'react';
import {getDatabaseCart, processOrder, removeFromDatabaseCart} from '../../utilities/fakedb';
import products from '../../fakeData/products'
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlacedOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }

    useEffect(()=>{
        const savedCart = getDatabaseCart();
        console.log(savedCart);
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
                    <button onClick={handlePlacedOrder} className='main-button'>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;