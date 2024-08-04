import Layout from "@/components/layouts/Layout";
import { useEffect, useState } from "react";
import AccountView from "./AccountView";
import PasswordView from "./PasswordView";
import { useAuthContext } from "@/contexts/AuthContext";
import { isAdmin, isOwner, isSuperAdmin, isUser } from "@/helpers/roleCheck";
import Head from "next/head";
import Link from "next/link";
import AuthenticatedPage from "@/components/AuthenticatedPage";
import MyBookings from "./MyBookings";
import { logout } from "@/db/auth";
import { useRouter } from "next/router";
import DashMenu from "@/components/buttons/DashMenu";

function ProfilePage() {
    const [view, setView] = useState('account');
    const { user: { user: { id: uid, role } }, status: { loggedIn } } = useAuthContext();
    const router = useRouter();
    // 
    function changeView(e) {
        e.preventDefault();
        setView(e.target.dataset.view);
    }

    return (
        <Layout>
            <Head>
                <title>myshow.com | Profile</title>
            </Head>
            <div className="flex">
                <div className="left-view w-[20%]">
                    <ul>
                        <li><button className={`my-2 menu-item capitalize rounded-sm px-1 py-2 ${view === 'account' ? 'bg-gray-100' : ''}`}
                            onClick={changeView} data-view="account">Account</button></li>
                        {(isUser(role) || isAdmin(role)) &&
                            <li><button className={`my-2 menu-item capitalize rounded-sm px-1 py-2 ${view === 'my-bookings' ? 'bg-gray-100' : ''}`}
                                onClick={changeView} data-view="my-bookings">Bookings</button></li>
                        }
                        {/*  */}
                        {
                            isAdmin(role) &&
                            <DashMenu>
                                <Link aria-label="myshow" href={"/admin"}>Admin Panel</Link>
                            </DashMenu>
                        }
                        {
                            (isSuperAdmin(role) || isOwner('role')) &&
                            <DashMenu>
                                <Link aria-label="myshow" href={"/superadmin"}>Superadmin Panel</Link>
                            </DashMenu>
                        }
                        {
                            isOwner(role) &&
                            <DashMenu>
                                <Link aria-label="myshow" href={"/owner"}>Owner Panel</Link>
                            </DashMenu>
                        }
                        {
                            loggedIn &&
                            <DashMenu>
                                <button onClick={async () => {
                                    await logout();
                                    router.push('/');
                                }}>
                                    Logout
                                </button>
                            </DashMenu>
                        }
                    </ul>
                </div>
                <div className="right-view w-[90%]">
                    {view === 'account' && <AccountView />}
                    {view === 'my-bookings' && <MyBookings />}
                    {view === 'password' && <PasswordView />}
                    {view === '' && <AccountView />}
                </div>
            </div>
        </Layout>
    )
}

export default () =>
    <AuthenticatedPage>
        <ProfilePage />
    </AuthenticatedPage>