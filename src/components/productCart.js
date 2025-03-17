import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import iconCart from '../assets/images/iconCart.png';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../stores/cart';
import Cookies from 'js-cookie'; 
import CookieConsent from './cookie'; 

const ProductCart = (props) => {
    const carts = useSelector(store => store.cart.items);
    const { id, name, price, image, slug } = props.data;
    const dispatch = useDispatch();
    const [showCookieConsent, setShowCookieConsent] = useState(false);     

    useEffect(() => {
        const cookieConsent = Cookies.get('cookieConsent');
        if (!cookieConsent) {
            console.log("Cookie consent not found, showing popup...");
            setShowCookieConsent(true); // Show cookie consent if not already accepted
        } else {
            console.log("Cookie consent already accepted: ", cookieConsent);
        }
    }, []);

    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: id,
            quantity: 1,
        }));
        console.log("Product added to cart:", { productId: id, quantity: 1 });
    };

    const handleCloseConsent = () => {
        setShowCookieConsent(false);
        console.log("Cookie consent popup closed.");
    };

    const handleAcceptCookies = () => {
        Cookies.set('cookieConsent', 'true', { expires: 365 });
        console.log("Cookies accepted and saved.");
        setShowCookieConsent(false);
    };

    const handleDeclineCookies = () => {
        console.log("Cookies declined.");
        setShowCookieConsent(false);
    };

    return (
        <div className='bg-white p-5 rounded-xl shadow-sm mt-6'>
            <Link to={`/${slug}`}>
                <img src={image} alt={name} className='w-full h-80 object-cover object-top' 
                    style={{ filter: 'drop-shadow(10px 25px 20px #0005)' }} />
            </Link>
            <h3 className='text-2xl py-3 text-center font-medium'>{name}</h3>
            <div className='flex justify-between items-center'>
                <p>
                    Rs.<span className='text-2xl font-medium'>{price}</span>
                </p>
                <button className='bg-gray-300 p-2 rounded-md text-sm hover:bg-gray-400 flex gap-2' onClick={handleAddToCart}>
                    <img src={iconCart} alt="" className='w-5' />
                    Add To Cart
                </button>
            </div>
            {showCookieConsent && (
                <CookieConsent 
                    onClose={handleCloseConsent} 
                    onAccept={handleAcceptCookies} 
                    onDecline={handleDeclineCookies} 
                />
            )}
        </div>
    );
}
export default ProductCart;
