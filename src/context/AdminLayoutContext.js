import { createContext, useState } from "react";

export const AdminContext = createContext({});


const AdminContextContainer = ({children}) => {
    const [showSidebar , setShowSidebar] = useState(false);

    return (
        <AdminContext.Provider value={{
            showSidebar ,
            setShowSidebar
        }}>
            {children}
        </AdminContext.Provider>
    );
}

export default AdminContextContainer;