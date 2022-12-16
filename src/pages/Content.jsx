import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import { AdminContext } from '../context/AdminLayoutContext';
import Logout from './auth/Logout';
import Brands from './brands/Brands';
import Carts from './Carts/Carts';
import Categories from './categories/Categories';
import Colors from './colors/Colors';
import Comments from './comments/Comments';
import Dashboard from './dashboard/Dashboard';
import Deliveries from './deliveries/Deliveries';
import Discounts from './discounts/Discounts';
import Error from './Error/Error';
import Guaranties from './guaranties/Guaranties';
import Orders from './orders/Orders';
import Permissions from './permissions/Permissions';
import Products from './products/Products';
import Questions from './questions/Questions';
import Roles from './roles/Roles';
import Users from './users/Users';

const Content = () => {
    const { showSidebar } = useContext(AdminContext);

    return (
        <section id="content_section"
            className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : null}`}>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/brands" element={<Brands />} />
                <Route path="/guaranties" element={<Guaranties />} />
                <Route path="/colors" element={<Colors />} />
                <Route path="/discounts" element={<Discounts />} />
                <Route path="/carts" element={<Carts />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/deliveries" element={<Deliveries />} />
                <Route path="/users" element={<Users />} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/permissions" element={<Permissions />} />
                <Route path="/comments" element={<Comments />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </section>
    )
}

export default Content;
