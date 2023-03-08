import React from 'react';
import CartsTable from './CartsTable';
import EditCart from './AddCart';

const Carts = () => {
    return (
        <div id="manage_cart_section" className="manage_cart_section main_section">
            <h4 className="text-center my-3">مدیریت سبد خرید</h4>
            <CartsTable />
        </div>
    );
}

export default Carts;
