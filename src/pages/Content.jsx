import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AdminContext } from '../context/AdminLayoutContext';
import Brand from './brand/Brand';
import Cart from './Cart/Cart';
import Category from './category/Category';
import Color from './color/Color';
import Comments from './comment/Comment';
import Dashboard from './dashboard/Dashboard';
import Delivery from './delivery/Delivery';
import Discount from './discount/Discount';
import Error from './Error/Error';
import Guarantee from './guarantee/Guarantee';
import Order from './order/Order';
import Permission from './permission/Permission';
import Product from './product/Product';
import Question from './question/Question';
import Role from './role/Role';
import User from './user/User';

const Content = () => {
    const {showSidebar} = useContext(AdminContext);

    return (
        <BrowserRouter>
            <section id="content_section"
                className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : null}`}>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/brand" element={<Brand />} />
                    <Route path="/guarantee" element={<Guarantee />} />
                    <Route path="/color" element={<Color />} />
                    <Route path="/discount" element={<Discount />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/delivery" element={<Delivery />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/role" element={<Role />} />
                    <Route path="/permission" element={<Permission />} />
                    <Route path="/comments" element={<Comments />} />
                    <Route path="/question" element={<Question />} />
                    <Route path="/" element={<Dashboard />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </section>
        </BrowserRouter>
    )
}

export default Content;
