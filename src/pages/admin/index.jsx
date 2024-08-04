import AuthenticatedPage from "@/components/AuthenticatedPage";
import HomeButton from "@/components/buttons/HomeButton";
import HallForm from "@/components/hall/HallForm";
import HallsView from "@/components/hall/HallsView";
import AdminContextProvider, { useAdmin } from "@/contexts/AdminContext";
import { useAuthContext } from "@/contexts/AuthContext";
import AdminDashboard from "./Dashboard";
import Bookings from "./Bookings";
import Link from "next/link";
import Notice from "@/components/Notice";

const menu = ['dashboard', 'add hall', 'our halls', 'bookings'];

function AdminNav() {
    const { user: { user } } = useAuthContext();
    const { view: { view, setView } } = useAdmin();
    return (
        <ul className="w-[20%] left-view">
            <li className="menu-item py-2 mx-auto w-max">
                <HomeButton />
            </li>
            <li className="menu-item">
                <Link href={"/profile"}>
                    <img width={70} className="rounded-3xl" src={user?.picture} alt={user?.name} />
                </Link>
            </li>
            {
                menu.map((item, i) => (
                    <li
                        onClick={(e) => {
                            setView(e.target.dataset.view);
                            localStorage.setItem('admin-view', e.target.dataset.view);
                        }}
                        key={i}
                        className={`rounded-sm px-1 py-2 my-1 menu-item capitalize ${view === item ? 'bg-gray-100' : ''}`}
                        data-view={item}>
                        {item}
                    </li>
                ))
            }
        </ul>
    )
}

function AdminView() {
    const { view: { view } } = useAdmin();
    const { user: { user: { id: uid, role } } } = useAuthContext();
    return (
        <div className="w-[80%] right-view">
            {view === 'dashboard' && <AdminDashboard />}
            {view === 'add hall' && <HallForm />}
            {view === 'our halls' && <HallsView uid={uid} role={role} />}
            {view === 'bookings' && <Bookings />}
        </div>
    )
}

export default function AdminPage() {
    return (
        <AuthenticatedPage>
            <AdminContextProvider>
                <div className="m-4 row h-screen">
                    <>
                        <AdminNav />
                        <hr />
                        <AdminView />
                    </>
                </div>
                <Notice />
            </AdminContextProvider>
        </AuthenticatedPage>
    )
}