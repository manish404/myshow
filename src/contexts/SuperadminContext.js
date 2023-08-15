import { createContext, useContext, useEffect, useState } from "react";

const SuperAdminContext = createContext({});
export function useSuperAdmin() {
    return useContext(SuperAdminContext)
}


export default function SuperAdminContextProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [view, setView] = useState('');
    useEffect(() => {
        const _view = localStorage.getItem('superadmin-view') || 'dashboard';
        setView(_view);
    }, []);
    return (
        <SuperAdminContext.Provider value={{
            view: { view, setView },
            status: { loggedIn, setLoggedIn }
        }}>
            {children}
        </SuperAdminContext.Provider>
    )
}