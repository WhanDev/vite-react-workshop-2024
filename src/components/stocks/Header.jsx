/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const token = localStorage.getItem('token')
    const tokenPayload = JSON.parse(atob(token.split('.')[1]))

    const handleLogout = () => {
        try {
            localStorage.clear();
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error('ปัญหาเกิดจาก:', error);
        }
    }

    return (
        <div>
            <nav className="border-Sky-200 bg-Sky-100">
                <div className="max-w-screen flex flex-wrap items-center justify-between p-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">Flowbite</span>
                    </a>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
                        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
                            <li>
                                {/* className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700" */}
                                <Link to="/admin">Home</Link>
                            </li>
                            <li>
                                {/* className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700" */}
                                <Link to="/admin/product">Product</Link>
                            </li>
                            <li>
                                {/* className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700" */}
                                <Link to="/admin/sale">Sale</Link>
                            </li>
                            <p className='text-1xl  text-blue-600'>
                                {tokenPayload.name}
                            </p>
                            <li>
                                <button className='bg-red-600 w-full rounded-lg text-white px-3'
                                    onClick={handleLogout}>
                                    <p className='text-1xl'>
                                        ออกจากระบบ
                                    </p>
                                </button>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>


        </div>
    );
}

export default Header;
