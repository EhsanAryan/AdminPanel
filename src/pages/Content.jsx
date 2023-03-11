import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import { AdminContext } from '../context/AdminLayoutContext';
import Logout from './auth/Logout';
import Brands from './brands/Brands';
import Carts from './carts/Carts';
import Attributes from './categories/attrs/Attributes';
import Categories from './categories/Categories';
import CategoriesChildren from './categories/CategoriesChildren';
import Colors from './colors/Colors';
import Comments from './comments/Comments';
import Dashboard from './dashboard/Dashboard';
import Deliveries from './deliveries/Deliveries';
import Discounts from './discounts/Discounts';
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
import AddCart from './carts/AddCart';
import PermComponent from '../components/PermComponent';
import { useHasPermission } from '../hooks/hasPermission';
import AddDelivery from './deliveries/AddDelivery';
import Error from '../components/Error';

const Content = () => {
    const { showSidebar } = useContext(AdminContext);
    const hasCategoriesPermission = useHasPermission("read_categories");
    const hasAddProductPermission = useHasPermission("create_product");
    const hasDiscountsPermission = useHasPermission("read_discounts");
    const hasCartsPermission = useHasPermission("read_carts");
    const hasUsersPermission = useHasPermission("read_users");
    const hasRolesPermission = useHasPermission("read_roles");
    const hasDeliveriesPermission = useHasPermission("read_deliveries");

    return (
        <section id="content_section"
            className={`bg-light py-2 px-3 ${showSidebar ? "with_sidebar" : null}`}>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />

                {hasCategoriesPermission && (
                    <Route path="/categories" element={<Categories />}>
                        <Route path=":categoryId" element={<CategoriesChildren />} />
                    </Route>
                )}

                <Route path="/categories/:categoryId/attributes"
                    element={<PermComponent component={<Attributes />} permTitle="read_category_attrs" />} />

                <Route path="/products"
                    element={<PermComponent component={<Products />} permTitle="read_products" />} />

                {hasAddProductPermission && (
                    <Route path="/products/add-product" element={<AddProduct />}>
                        <Route path=":productId" element={<ProductToEdit />} />
                    </Route>
                )}

                <Route path="/products/set-attr"
                    element={<PermComponent component={<SetProductAttribute />} permTitle="read_product_attrs" />} />

                <Route path="/products/gallery"
                    element={<PermComponent component={<ProductGallery />} permTitle="create_product_image" />} />

                <Route path="/brands"
                    element={<PermComponent component={<Brands />} permTitle="read_brands" />} />

                <Route path="/guaranties"
                    element={<PermComponent component={<Guaranties />} permTitle="read_guarantees" />} />

                <Route path="/colors"
                    element={<PermComponent component={<Colors />} permTitle="read_colors" />} />

                {hasDiscountsPermission && (
                    <Route path="/discounts" element={<Discounts />}>
                        <Route path="add-discount"
                            element={<PermComponent component={<AddDiscount />} permTitle="create_discount" />} />
                    </Route>
                )}

                {hasCartsPermission && (
                    <Route path="/carts" element={<Carts />}>
                        <Route path="add-cart"
                            element={<PermComponent component={<AddCart />} permTitle="create_cart" />} />
                    </Route>
                )}

                <Route path="/orders"
                    element={<PermComponent component={<Orders />} permTitle="read_orders" />} />


                {hasDeliveriesPermission && (
                    <Route path="/deliveries" element={<Deliveries />}>
                        <Route path="add-delivery"
                            element={<PermComponent component={<AddDelivery />} permTitle="create_delivery" />} />
                    </Route>
                )}


                {hasUsersPermission && (
                    <Route path="/users" element={<Users />}>
                        <Route path="add-user"
                            element={<PermComponent component={<AddUser />} permTitle="create_user" />} />
                    </Route>
                )}

                {hasRolesPermission && (
                    <Route path="/roles" element={<Roles />}>
                        <Route path='add-role'
                            element={<PermComponent component={<AddRole />} permTitle="create_role" />} />
                    </Route>
                )}

                <Route path="/permissions"
                    element={<PermComponent component={<Permissions />} permTitle="read_permissions" />} />

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
