import React from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    // const total = cart.reduce((total, prd) => total + prd.price,0);
    let total = 0;
    for(let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    let shipping = 0;
    if(total > 15){
        shipping = 4.99;
    }else if(total > 0){
        shipping = 12.99;
    }

    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precession = num.toFixed(2);
        return Number(precession);
    }
    return (
        <div>
            <h3>Order Summary</h3>
            <p>Items Orders: {cart.length}</p>
            <p>Product Price: {formatNumber(total)}</p>
            <p>Shipping Cost: {shipping}</p>
            <p>Tax + Vat: {tax}</p>
            <p>Total Price: {grandTotal}</p>
            <br />
            <Link to={'review'} className='main-button'>Review Order</Link>
        </div>
    );
};

export default Cart;