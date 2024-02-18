/* eslint-disable no-unused-vars */
import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div>
            <Header />
            <div>
                <Outlet />
            </div>
            <h1>Footer</h1>
        </div>
    )
}

export default Layout