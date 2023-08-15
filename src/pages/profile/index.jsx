import Layout from "@/components/layouts/Layout";
import { useEffect, useState } from "react";
import ProfileView from "./ProfileView";
import AccountView from "./AccountView";
import PasswordView from "./PasswordView";
import { useAuthContext } from "@/contexts/AuthContext";
import { isAdmin, isUser } from "@/helpers/roleCheck";
import Head from "next/head";
import Link from "next/link";
import AuthenticatedPage from "@/components/AuthenticatedPage";
import { useBookings } from "@/hooks/bookingHooks";
import println from "@/helpers/print";

function BookedMoviesView() {
    const { user: { user: { id } } } = useAuthContext();
    const { data: mybookings } = useBookings(id);
    useEffect(() => {
        // println(user);
    }, [])
    return (
        <table className="w3-table w3-bordered">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Movie</th>
                    <th>Hall</th>
                    <th>Show</th>
                    <th>Paid?</th>
                    <th>Seats</th>
                </tr>
            </thead>
            <tbody>
                {mybookings &&
                    mybookings.map((booking, i) => {
                        return (
                            <tr key={i}>
                                <td>{booking?.date}</td>
                                <td className="capitalize">{booking?.movies?.title}</td>
                                <td className="capitalize">{booking?.halls.name}</td>
                                <td>{booking?.showtimes?.time} &nbsp; {booking?.showtimes?.shift === 0 ? 'am' : 'pm'}</td>
                                <td>{booking?.booked ? "✔" : "❌"}</td>
                                <td>{booking?.seats?.length}</td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    )
}

function ProfilePage() {
    const [view, setView] = useState('profile');
    const { user: { user: { id: uid, role } } } = useAuthContext();
    function changeView(e) {
        e.preventDefault();
        setView(e.target.dataset.view);
    }
    function renderRightView() {
        switch (view) {
            case 'profile':
                return <ProfileView />;
            case 'account':
                return <AccountView />;
            case 'bookings':
                return <BookedMoviesView />;
            case 'password':
                return <PasswordView />;
                break;
            default:
                return <ProfileView />;
        }
    }

    return (
        <Layout>
            <Head>
                <title>myshow.com | Profile</title>
            </Head>
            <div className="flex">
                <div className="left-view w-[20%]">
                    <ul>
                        <li className="menu-item">
                            <button onClick={changeView} data-view="profile">Profile</button>
                            {/* can see&edit public data [name, email, contact, bio, profile-img] */}
                        </li>
                        {(isUser(role) || isAdmin(role)) && <li className="menu-item">
                            <button onClick={changeView} data-view="bookings">Bookings</button>
                        </li>}
                        {/*  */}
                        {
                            isAdmin(role) &&
                            <li className="menu-item">
                                <Link href={"/admin"}>
                                    Admin Panel
                                </Link>
                            </li>
                        }
                    </ul>
                </div>
                <div className="right-view w-[80%]">
                    {
                        renderRightView()
                    }
                </div>
            </div>
        </Layout>
    )
}

export default () =>
    <AuthenticatedPage>
        <ProfilePage />
    </AuthenticatedPage>