import AuthenticatedPage from "@/components/AuthenticatedPage";
import HomeButton from "@/components/buttons/HomeButton";
import HallForm from "@/components/hall/HallForm";
import HallsView from "@/components/hall/HallsView";
import AdminContextProvider, { useAdmin } from "@/contexts/AdminContext";
import { useAuthContext } from "@/contexts/AuthContext";

const menu = ['dashboard', 'add-hall', 'halls', 'bookings'];

function AdminNav() {
    const { view: { setView } } = useAdmin();
    return (
        <ul className="w-[20%] left-view">
            <li className="menu-item py-2">
                <HomeButton />
            </li>
            {
                menu.map((item, i) => (
                    <li onClick={(e) => {
                        setView(e.target.dataset.view);
                        localStorage.setItem('admin-view', e.target.dataset.view);
                    }} key={i} className="my-2 menu-item capitalize" data-view={item}>{item}</li>
                ))
            }
        </ul>
    )
}

function Dashboard() { return (<>Dashboard - All Stats</>) }

function AdminView() {
    const { view: { view } } = useAdmin();
    const { user: { user: { id: uid, role } } } = useAuthContext();
    return (
        <div className="w-[80%] right-view">
            {view === 'dashboard' && <Dashboard />}
            {view === 'add-hall' && <HallForm />}
            {view === 'movies' && <MoviesView />}
            {view === 'halls' && <HallsView uid={uid} role={role} />}
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
            </AdminContextProvider>
        </AuthenticatedPage>
    )
}