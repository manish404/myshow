import { createContext, useContext, useState } from "react";

const AdminContext = createContext({});
export function useAdmin() {
    return useContext(AdminContext)
}


export default function AdminContextProvider({ children }) {
    const [view, setView] = useState(localStorage.getItem('admin-view') || 'dashboard');
    return (
        <AdminContext.Provider value={{
            view: { view, setView }
        }}>
            {children}
        </AdminContext.Provider>
    )
}