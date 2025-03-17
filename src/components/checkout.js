import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import bgmilk from '../components/bgmilk.png'; // Importing the background image

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { cartItems, totalBill } = location.state || { cartItems: [], totalBill: 0 };

    // Function to navigate to /home
    const handleGoBack = () => {
        navigate('/home'); // Go to home page
    };

    const handleProceedToPayment = () => {
        navigate('/payment-success', {
            state: {
                cartItems,
                totalBill,
            },
        });
    };
    
    return (
        <div
            className="relative min-h-screen py-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgmilk})` }} // Setting bgmilk as background
        >
            {/* Go Back Button positioned in the top left corner */}
            <button 
                className="absolute top-5 left-5 bg-black shadow-lg text-white px-4 py-2 rounded-full hover:bg-gray-100 transition duration-300 text-lg z-10 transform hover:scale-105"
                onClick={handleGoBack}
            >
                Back to Home
            </button>

            <div className="checkout-container max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-xl mt-10 transform hover:scale-105 transition duration-300">
                <h2 className="checkout-title text-3xl font-bold mb-4 text-gray-800 text-center">Checkout</h2>

                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">Selected Items:</h3>
                    <div className="border border-gray-300 rounded-lg p-3 bg-gray-50 shadow-md">
                        <ul>
                            {cartItems.length > 0 ? (
                                cartItems.map((item, index) => {
                                    // Log each item for debugging
                                    console.log(`Item ${index}:`, item); 
                                    return (
                                        <li key={index} className="items border-b border-gray-200 py-3 flex items-center last:border-b-0 hover:bg-gray-100 transition duration-200">
                                            <img src={item.image} alt={item.name} className='w-16 h-16 mr-3 object-cover rounded-md shadow-sm transform hover:scale-105 transition duration-300' />
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900 text-lg">{item.name}</span>
                                                <span className="text-sm text-gray-600">Price: ₹{item.price}</span>
                                                <span className="text-sm text-gray-600">Quantity: {item.quantity}</span>
                                                <span className="text-sm text-gray-600">Total: ₹{(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        </li>
                                    );
                                })
                            ) : (
                                <li className="text-red-600">No items selected!</li>
                            )}
                        </ul>
                    </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4 text-gray-900 text-center">Total Bill: ₹{totalBill.toFixed(2)}</h3>

                {/* Checkout Button Container with Creative Styles */}
                <div className="flex space-x-4 mt-4 justify-center">
                    <button 
                        className="bg-green-600 text-white px-5 py-2 rounded-full shadow-lg hover:bg-green-700 transition duration-300 text-lg transform hover:scale-105 flex items-center justify-center"
                        style={{
                            background: 'linear-gradient(to right, #4caf50, #66bb6a)',
                            boxShadow: '0 4px 15px rgba(0, 128, 0, 0.4)',
                        }}
                        onClick={handleProceedToPayment}
                    >
                        <span className="text-lg font-semibold">Proceed to Payment</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
