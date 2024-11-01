import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../../fakeData/products';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = products.find((product)=>{
        return product.key == productKey;
    });
    
    console.log(product);
    return (
        <div>
            <h1>Your product details.</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;