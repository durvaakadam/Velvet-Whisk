import React, { useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom'; 
import { products } from '../products';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../stores/cart'; 
import CartTab from '../components/cartTab'; 
import Header from '../components/header'; // Import Header

const Detail = () => {
    const { slug } = useParams();
    const [detail, setDetail] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const statusTabCart = useSelector(store => store.cart.statusTab); // Get cart status from Redux

    useEffect(() => {
        const findDetail = products.filter(product => product.slug === slug);
        if (findDetail.length > 0) {
            setDetail(findDetail[0]);
        } else {
            window.location.href = '/';
        }
    }, [slug]);

    const handleMinusQuantity = () => {
        setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
    };

    const handlePlusQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = () => {
        dispatch(addToCart({
            productId: detail.id,
            quantity: quantity
        }));
    };

    return (
        <div className="px-4 py-8 max-w-7xl mx-auto relative transition-transform duration-500">
            <Header /> {/* Render Header Component */}
            <div className="px-4 py-8 mt-4"> {/* Added mt-16 for spacing below the header */}
            <h2 className='text-4xl text-center font-bold mb-12 text-slate-700'>PRODUCT DETAIL</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                <div className='flex justify-center'>
                    <img 
                        src={detail.image} 
                        alt="" 
                        className='w-full h-auto max-h-[500px] object-contain' 
                    />
                </div>
                <div className='flex flex-col gap-8'>
                    <h1 className='text-5xl uppercase font-bold mb-6 text-slate-900'>{detail.name}</h1>
                    <p className='font-bold text-4xl mb-6 text-slate-800'>
                        Rs. {detail.price}
                    </p>
                    <div className='flex gap-6 items-center'>
                        <div className='flex gap-2 justify-center items-center'>
                            <button className='bg-gray-200 h-full w-12 font-bold text-2xl rounded-xl flex justify-center items-center shadow-md' onClick={handleMinusQuantity}>-</button>
                            <span className='bg-gray-300 h-full w-12 font-bold text-2xl rounded-xl flex justify-center items-center'>{quantity}</span>
                            <button className='bg-gray-200 h-full w-12 font-bold text-2xl rounded-xl flex justify-center items-center shadow-md' onClick={handlePlusQuantity}>+</button>
                        </div>
                        <button className='bg-slate-900 text-white px-8 py-4 text-lg rounded-xl shadow-2xl transition-transform transform hover:scale-105' onClick={handleAddToCart}>
                            Add To Cart
                        </button>
                    </div>
                    <p className='mt-8 text-lg text-gray-700'>
                        {detail.description}
                    </p>
                </div>
            </div>
            </div>
            {/* CartTab with conditional class for sliding in */}
            <div 
                className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] transition-transform duration-500 ${statusTabCart ? 'translate-x-0' : 'translate-x-full'} z-50`} 
            >
                {statusTabCart && <CartTab />} 
            </div>
        </div>
    );
};

export default Detail;
