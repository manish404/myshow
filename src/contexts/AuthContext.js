import { getRole } from '@/db/auth';
import supabase from '@/db/supabase';
import { setNotice } from '@/store/slices/common';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router";

const AuthContext = createContext({});

function useAuthContext() {
    return useContext(AuthContext);
}

function AuthContextProvider(props) {
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();
    // 
    useEffect(() => {
        const authEvent = supabase.auth.onAuthStateChange(async (e, session) => {
            // println('auth state change!!!', e, session?.user, loggedIn, user);
            if (e === 'SIGNED_OUT') {
                setUser({});
                setLoggedIn(false);
                dispatch(setNotice('Signed Out!'));
            } else if (e === 'SIGNED_IN') {
                if (!loggedIn) {
                    localStorage.setItem('_href', location.href);
                    const _user = session?.user?.user_metadata;
                    _user['id'] = session?.user?.id;
                    // 
                    const { data, error } = await getRole();
                    if (data.length > 0) {
                        const roleExp = data[0].expires_on || null;
                        // check role expiration date, if expired: set role to user;
                        _user['role'] = data[0].role;
                        _user['role_expiration'] = roleExp;
                    }
                    setUser({ ..._user });
                    // 
                    dispatch(setNotice(`Welcome, ${_user.name}!`));
                    setLoggedIn(true);
                    router.replace(localStorage.getItem('_href') || '/');
                }
            }
        })
        return () => {
            authEvent.data.subscription.unsubscribe();
        }
    }, [loggedIn]);
    // 
    return (
        <AuthContext.Provider value={{
            user: { user, setUser },
            status: { loggedIn, setLoggedIn }
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
export { useAuthContext }