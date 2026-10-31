import React from 'react';
import { Outlet } from 'react-router-dom'; 
import Header from './header';
import CartTab from './cartTab'; 
import { useSelector } from 'react-redux';
import CookieConsent from './cookie'; // Import the CookieConsent component

const Layout = () => {
    const statusTabCart = useSelector(store => store.cart.statusTab);

    return (
        <div className='bg-zinc-200'>
            <main
    className={`w-full max-w-[1200px] m-auto p-5 box-border
    transition-transform duration-300
    ${statusTabCart === false ? "" : "lg:-translate-x-28"}`}
>
                <Header />
                <Outlet />
                <CookieConsent /> 
            </main>
            <CartTab />
        </div>
    );
}

export default Layout;
