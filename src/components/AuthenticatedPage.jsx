import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";

export default function AuthenticatedPage({ children, redirect = "/" }) {
    const { status: { loggedIn } } = useAuthContext();
    // 
    useEffect(() => {
        if (!loggedIn) window.location.href = redirect;
    })
    // 
    return (
        <>
            {loggedIn && children}
        </>
    )
}