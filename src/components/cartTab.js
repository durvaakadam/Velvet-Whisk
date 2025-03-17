import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './cartItem';
import { toggleStatusTab, clearCart } from '../stores/cart'; 
import { useNavigate } from 'react-router-dom'; 
import { products } from '../products'; 

const CartTab = () => {
  const carts = useSelector(store => store.cart.items);
  const statusTab = useSelector(store => store.cart.statusTab);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseTabCart = () => {
    dispatch(toggleStatusTab());
  };

  const handleCheckout = () => {
    const cartItemsWithDetails = carts.map(item => {
        const productDetail = products.find(product => product.id === item.productId);
        const price = productDetail ? productDetail.price : 0; 

        return {
            ...item,
            name: productDetail ? productDetail.name : 'Unknown Product',
            image: productDetail ? productDetail.image : '',
            price: price,
        };
    });

    const totalBill = cartItemsWithDetails.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );


    dispatch(toggleStatusTab());

    navigate('/checkout', {
        state: {
            cartItems: cartItemsWithDetails,
            totalBill: totalBill,
        },
    });
};


  const handleClearCart = () => {
    dispatch(clearCart()); // Clear the cart
  };

  return (
    <div
      className={`fixed top-0 right-0 bg-gray-700 shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] 
      transform transition-transform duration-500 rounded-l-xl
      ${statusTab === false ? 'translate-x-full' : ''}`}
    >
      <h2 className="p-5 text-white text-2xl border-b border-gray-500 rounded-tl-xl">Shopping Cart</h2>
      <div className="p-5 space-y-3">
        {carts.length > 0 ? (
          carts.map((item, key) => <CartItem key={key} data={item} />)
        ) : (
          <p className="text-white text-center">Your cart is empty!</p>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 p-3 border-t border-gray-500 rounded-bl-xl">
        <button className="bg-black text-white p-2 rounded-md" onClick={handleCloseTabCart}>
          CLOSE
        </button>
        <button className="bg-red-600 text-white p-2 rounded-md" onClick={handleClearCart}>
          CLEAR CART
        </button>
        <button className="bg-amber-600 text-white p-2 rounded-md" onClick={handleCheckout}>
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartTab;