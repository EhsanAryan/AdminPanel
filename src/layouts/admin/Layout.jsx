import React from 'react';
import AdminContextContainer from '../../context/AdminLayoutContext';
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";
import Content from '../../pages/Content';

const Layout = () => {

    return (
        <AdminContextContainer>
            <Navbar />
            <Sidebar />
            <Content />
        </AdminContextContainer>
    )
}

export default Layout;