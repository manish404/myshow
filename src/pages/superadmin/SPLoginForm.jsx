import { useSuperAdmin } from "@/contexts/SuperadminContext";
import println from "@/helpers/print";
import { setNotice } from "@/store/slices/common";
import { useState } from "react";
import { useDispatch } from "react-redux";

const spSchema = { username: '', password: '' };

function SPLoginForm() {
    const [sp, setSp] = useState({ ...spSchema });
    const { status: { setLoggedIn } } = useSuperAdmin();
    const dispatch = useDispatch();
    function superadminLogin(e) {
        e.preventDefault();
        println(sp, process.env.NEXT_PUBLIC_SUPERADMIN_NAME);
        if (sp.username === process.env.NEXT_PUBLIC_SUPERADMIN_NAME &&
            sp.password === process.env.NEXT_PUBLIC_SUPERADMIN_PASS) {
            setLoggedIn(true);
            setSp({ ...spSchema });
        } else {
            dispatch(setNotice('Incorrect username or password!'));
        }
    }
    function handleInputChange(e) {
        const { name, value } = e.target;
        setSp({ ...sp, [name]: value });
    }
    return (
        <div className="h-screen w-screen grid items-center">
            <div className="w-[30%] m-auto">
                <h1 className="text-lg font-semibold">Super Admin Login Form</h1>
                <form onSubmit={superadminLogin}>
                    <div className="input-row">
                        <label htmlFor="username">Username</label>
                        <input onChange={handleInputChange} value={sp.username} type="text" name="username" />
                    </div>
                    <div className="input-row">
                        <label htmlFor="password">Password</label>
                        <input onChange={handleInputChange} value={sp.password} type="password" name="password" />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>

        </div>
    )
}

export default SPLoginForm;