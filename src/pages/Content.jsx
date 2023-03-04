import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import { AdminContext } from '../context/AdminLayoutContext';
import Logout from './auth/Logout';
import Brands from './brands/Brands';
import Carts from './Carts/Carts';
import Attributes from './categories/attrs/Attributes';
import Categories from './categories/Categories';
import CategoriesChildren from './categories/CategoriesChildren';
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
import AddProduct from './products/AddProduct';
import Questions from './questions/Questions';
import Roles from './roles/Roles';
import Users from './users/Users';
import ProductToEdit from './products/ProductToEdit';
import SetProductAttribute from './products/Attrs/SetProductAttribute';
import ProductGallery from './products/gallery/ProductGallery';
import AddDiscount from './discounts/AddDiscount';
import AddRole from './roles/AddRole';
import AddUser from './users/AddUser';
import { useSelector } from 'react-redux';

const Content = () => {
    const { showSidebar } = useContext(AdminContext);
    const { user } = useSelector(state => state);

    let permissions = [];
    for (let role of user.roles) {
        permissions = [...permissions, ...role.permissions];
    }

    const hasPermission = (permissionTitle) => {
        return permissions.findIndex(p => p.title.includes(permissionTitle)) > -1;
    }

    const isMainAdmin = () => {
        return user.roles[0].title.includes("admin");
    }

    return (
        <section id="content_section"
            className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : null}`}>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />

                {(hasPermission("read_categories") || isMainAdmin()) && (
                    <Route path="/categories" element={<Categories />}>
                        <Route path=":categoryId" element={<CategoriesChildren />} />
                    </Route>
                )}

                {(hasPermission("read_category_attrs") || isMainAdmin()) && (
                    <Route path="/categories/:categoryId/attributes" element={<Attributes />} />
                )}

                {(hasPermission("read_products") || isMainAdmin()) && (
                    <Route path="/products" element={<Products />} />
                )}

                {(hasPermission("create_product") || isMainAdmin()) && (
                    <Route path="/products/add-product" element={<AddProduct />}>
                        <Route path=":productId" element={<ProductToEdit />} />
                    </Route>
                )}

                {(hasPermission("read_product_attrs") || isMainAdmin()) && (
                    <Route path="/products/set-attr" element={<SetProductAttribute />} />
                )}

                {(hasPermission("create_product_image") || isMainAdmin()) && (
                    <Route path="/products/gallery" element={<ProductGallery />} />
                )}

                {(hasPermission("read_brands") || isMainAdmin()) && (
                    <Route path="/brands" element={<Brands />} />
                )}

                {(hasPermission("read_guarantees") || isMainAdmin()) && (
                    <Route path="/guaranties" element={<Guaranties />} />
                )}

                {(hasPermission("read_colors") || isMainAdmin()) && (
                    <Route path="/colors" element={<Colors />} />
                )}

                {(hasPermission("read_discounts") || isMainAdmin()) && (
                    <Route path="/discounts" element={<Discounts />}>
                        <Route path="add-discount" element={<AddDiscount />} />
                    </Route>
                )}

                {(hasPermission("read_carts") || isMainAdmin()) && (
                    <Route path="/carts" element={<Carts />} />
                )}

                {(hasPermission("read_orders") || isMainAdmin()) && (
                    <Route path="/orders" element={<Orders />} />
                )}

                {(hasPermission("read_deliveries") || isMainAdmin()) && (
                    <Route path="/deliveries" element={<Deliveries />} />
                )}

                {(hasPermission("read_users") || isMainAdmin()) && (
                    <Route path="/users" element={<Users />}>
                        <Route path="add-user" element={<AddUser />} />
                    </Route>
                )}

                {(hasPermission("read_roles") || isMainAdmin()) && (
                    <Route path="/roles" element={<Roles />}>
                        <Route path='add-role' element={<AddRole />} />
                    </Route>
                )}

                {(hasPermission("read_permissions") || isMainAdmin()) && (
                    <Route path="/permissions" element={<Permissions />} />
                )}

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
